const mysql = require('mysql2');
const inquirer = require('inquirer');
const express = require('express');
const { json } = require('express');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: false }));
// this converts the req.body object to json so that it can be called in variables
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
// remember to add password if you want to use
        password: '',
        database: 'employees_db'
    },
    console.log('Connected to employee_db database')
);

const menuText = `
┏━━━┓━━━━━━━━┏┓━━━━━━━━━━━━━━━━━━━━━━━━━━┏━┓┏━┓━━━━━━━━━━━━━━━━━━━━━━━━━
┃┏━━┛━━━━━━━━┃┃━━━━━━━━━━━━━━━━━━━━━━━━━━┃┃┗┛┃┃━━━━━━━━━━━━━━━━━━━━━━━━━
┃┗━━┓┏┓┏┓┏━━┓┃┃━┏━━┓┏┓━┏┓┏━━┓┏━━┓━━━━━━━━┃┏┓┏┓┃┏━━┓━┏━┓━┏━━┓━┏━━┓┏━━┓┏━┓
┃┏━━┛┃┗┛┃┃┏┓┃┃┃━┃┏┓┃┃┃━┃┃┃┏┓┃┃┏┓┃━━━━━━━━┃┃┃┃┃┃┗━┓┃━┃┏┓┓┗━┓┃━┃┏┓┃┃┏┓┃┃┏┛
┃┗━━┓┃┃┃┃┃┗┛┃┃┗┓┃┗┛┃┃┗━┛┃┃┃━┫┃┃━┫━━━━━━━━┃┃┃┃┃┃┃┗┛┗┓┃┃┃┃┃┗┛┗┓┃┗┛┃┃┃━┫┃┃━
┗━━━┛┗┻┻┛┃┏━┛┗━┛┗━━┛┗━┓┏┛┗━━┛┗━━┛━━━━━━━━┗┛┗┛┗┛┗━━━┛┗┛┗┛┗━━━┛┗━┓┃┗━━┛┗┛━
━━━━━━━━━┃┃━━━━━━━━━┏━┛┃━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┏━┛┃━━━━━━━
━━━━━━━━━┗┛━━━━━━━━━┗━━┛━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┗━━┛━━━━━━━                                                               
`;
// inquirer functions
function init() {
    console.log(menuText);
    loadMenu();
}

function loadMenu() {
    inquirer
    .prompt([
    {
    type: 'list',
    message: "What would you like to do?",
    name: "selectoption",
    choices: ['View all Employees', 'View all Employees by Department', 'View all Employees by Manager', 
    'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager', 
    'View all Roles', 'Add Role', 'Remove Role', 'View all Departments', 'Add Department', 'Remove Department'],
    },
    ])
// based on the response from inquirer we call buildEngineer() or buildIntern()
    .then ((response) => {
        if (response.selectoption === "View all Employees") {
            getAll();
        } else if (response.selectoption === "View all Employees by Department") {
            empbyDep();
        } else if (response.selectoption === "View all Employees by Manager") {
            empbyMan();
        } else if (response.selectoption === "View all Roles") {
            getRoles();
        } else if (response.selectoption === "View all Departments") {
            getDepts();
        }
    });
}

function getAll() {
    const sql = `SELECT e.id, e.first_name, e.last_name, m.first_name AS manager, r.title, r.salary, d.dep_name AS department
    FROM employee AS e 
    LEFT JOIN role AS r ON e.role_id = r.id
    LEFT JOIN department AS d ON r.department_id = d.id
    LEFT JOIN employee AS m ON e.manager_id = m.id;`;
    db.query(sql, (err, rows) => {
        console.table(rows);
        loadMenu();
    });
  }

function empbyDep() {
    const sql = `SELECT e.id, e.first_name, e.last_name, m.first_name AS manager, r.title, r.salary, d.dep_name AS department
    FROM employee AS e 
    LEFT JOIN role AS r ON e.role_id = r.id
    LEFT JOIN department AS d ON r.department_id = d.id
    LEFT JOIN employee AS m ON e.manager_id = m.id
    ORDER BY department;`;
    db.query(sql, (err, rows) => {
        console.table(rows);
        loadMenu();
    });
}

function empbyMan() {
    const sql = `SELECT e.id, e.first_name, e.last_name, m.first_name AS manager, r.title, r.salary, d.dep_name AS department
    FROM employee AS e 
    LEFT JOIN role AS r ON e.role_id = r.id
    LEFT JOIN department AS d ON r.department_id = d.id
    LEFT JOIN employee AS m ON e.manager_id = m.id
    ORDER BY manager;`;
    db.query(sql, (err, rows) => {
        console.table(rows);
        loadMenu();
    });
}

function getRoles() {
    const sql = `select r.id, r.title, r.salary from role AS r;`;
    db.query(sql, (err, rows) => {
        console.table(rows);
        loadMenu();
    });
}

function getDepts() {
    const sql = `select * from department;`;
    db.query(sql, (err, rows) => {
        console.table(rows);
        loadMenu();
    });
}

// get request for view all employees,

// this is the query being pushed by express to sql using the db.query method
// our query string from the const sql makes up the first param being passed

// this says to set network error status as 500 if there is an error and send an error message in json format


// function viewEmployees() {
//     const outPut = getEmployees().then(function (response) {
//         console.table(response);
//     })
// }


// get request for view all departments, 

// get request for view all roles

// post request to add employee

// post request to add role

// post request to add department

// put request to update employee role

// put request to update employee manager

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

init();