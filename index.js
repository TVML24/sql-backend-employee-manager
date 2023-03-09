const mysql = require('mysql2');
const inquirer = require('inquirer');
const util = require('util');
const cTable = require('console.table');

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
function query(sql, params) {
    return new Promise((resolve, reject) => {
        db.query(sql, params,(err, data) => {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        })
    });
};

// practice with writing for another library that has only a callback

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
async function init() {
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
    'View all Roles', 'Add Role', 'Remove Role', 'View all Departments', 'Add Department', 'Remove Department', 'View Departmental Expenditure'],
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
        } else if (response.selectoption === "Add Employee") {
            addEmp();
        } else if (response.selectoption === 'Remove Employee') {
            removeEmp();
        } else if (response.selectoption === "View all Roles") {
            getRoles();
        } else if (response.selectoption === 'Add Role') {
            addRole();
        } else if (response.selectoption === 'Remove Role') {
            removeRole();
        } else if (response.selectoption === "Update Employee Role") {
            updateRole();
        } else if (response.selectoption === 'Update Employee Manager') {
            updateMan();
        } else if (response.selectoption === "View all Departments") {
            getDepts();
        } else if (response.selectoption === "Add Department") {
            addDept();
        } else if (response.selectoption === "Remove Department") {
            remDept();
        } else if (response.selectoption === 'View Departmental Expenditure') {
            viewExp();
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

async function addEmp() {
    const departments = await getdepData();
    const roles = await getroleData();
    const managers = await getmanData();
    // console.log(roles);
    inquirer
        .prompt([
            {
            type: "input",
            name: "firstName",
            message: "What is the employees' first name?",
            validate: val => /[a-z1-9]/gi.test(val),          
            },
            {
            type: 'input',
            message: "What is the employees' last name?",
            name: "lastName",
            validate: val => /[a-z1-9]/gi.test(val),
            },
            {
            type: 'list',
            message: "What Department does the employee belong to?",
            name: "whichDep",
            choices: [...departments],
            },
            {
            type: 'list',
            message: "What Role will the employee have?",
            name: "whichRole",
            choices: [...roles],
            },
            {
            type: 'list',
            message: "Who is the Employee's Manager?",
            name: "whichMan",
            choices: [...managers],
            },
            ])
            .then((response) => {

            const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES (?, ?, ?, ?);`
            query(sql, [response.firstName, response.lastName, response.whichRole, response.whichMan])
            console.log("Employee Added!");
            loadMenu();
            })           
}


async function removeEmp() {
    const employees = await getempData();
    inquirer
        .prompt([
            {
            type: 'list',
            message: "What employee would you like to remove?",
            name: "deleteWhich",
            choices: [...employees],
            },
        ])
        .then((response) => {
            const sql = `DELETE FROM employee WHERE id=?;`
            query(sql, [response.deleteWhich])
            console.log("Employee removed from records!");
            loadMenu();
        })
}

function getRoles() {
    const sql = `select r.id, r.title, r.salary from role AS r;`;
    db.query(sql, (err, rows) => {
        console.table(rows);
        loadMenu();
    });
}

async function updateRole() {
    const roles = await getroleData();
    const employees = await getempData();
    inquirer
    .prompt([
        {
        type: 'list',
        message: "Which employee would you like to update?",
        name: "updateWhich",
        choices: [...employees],
        },
        {
        type: 'list',
        message: "What Role will the employee now hold?",
        name: "whichRole",
        choices: [...roles],
        },
    ])
    .then((response) => {
        const sql = `UPDATE employee SET role_id=? WHERE id=?;`
        query(sql, [response.whichRole, response.updateWhich])
        console.log("Employee role updated!");
        loadMenu();
    })
}

async function addRole() {
    const departments = await getdepData();
    inquirer
    .prompt([
        {
        type: "input",
        name: "newTitle",
        message: "What is the name of this new Role?",
        validate: val => /[a-z1-9]/gi.test(val),          
        },
        {
        type: "input",
        name: "newSalary",
        message: "What is the salary associated with this role?",
        validate: val => /[1-9]/gi.test(val),          
        },
        {
        type: 'list',
        message: "Which department will oversee those assigned this role?",
        name: "whichDep",
        choices: [...departments],
        },
    ])
    .then((response) => {
        const sql = `INSERT INTO role (title, salary, department_id)
        VALUES (?, ?, ?);`
        query(sql, [response.newTitle, response.newSalary, response.whichDep])
        console.log("New Role Added!");
        loadMenu();
    })
}

function addDept() {
    inquirer
    .prompt([
        {
        type: "input",
        name: "newDept",
        message: "What is the name of this new Department?",
        validate: val => /[a-z1-9]/gi.test(val),          
        },
    ])
    .then((response) => {
        const sql = `INSERT INTO department (dep_name)
        VALUES (?);`
        query(sql, [response.newDept])
        console.log("New Department Added!");
        loadMenu();
    })
}

async function remDept() {
    const departments = await getdepData();
    inquirer
    .prompt([
        {
        type: 'list',
        message: "Which department would you like to remove?",
        name: "whichDep",
        choices: [...departments],
        },
    ])
    .then((response) => {
        const sql = `DELETE FROM department WHERE id=?;`
        query(sql, [response.whichDep])
        console.log("This Department has been deleted!");
        loadMenu();
    })
}

async function removeRole() {
    const roles = await getroleData();
    inquirer
    .prompt([
        {
        type: 'list',
        message: "Which role would you like to remove?",
        name: "whichRole",
        choices: [...roles],
        },
    ])
    .then((response) => {
        const sql = `DELETE FROM role WHERE id=?;`
        query(sql, [response.whichRole])
        console.log("Role has been Removed!");
        loadMenu();
    })
}

async function updateMan() {
    const employees = await getempData();
    const managers = await getmanData();
    inquirer
    .prompt([
        {
        type: 'list',
        message: "Which employee would you like to update?",
        name: "updateWhich",
        choices: [...employees],
        },
        {
        type: 'list',
        message: "Which Manager is the employee now assigned to?",
        name: "whichMan",
        choices: [...managers],
        },
    ])
    .then((response) => {
        const sql = `UPDATE employee SET manager_id=? WHERE id=?;`
        query(sql, [response.whichMan, response.updateWhich])
        console.log("Employee manager updated!");
        loadMenu();
    })

}

function getDepts() {
    const sql = `select * from department;`;
    db.query(sql, (err, rows) => {
        console.table(rows);
        loadMenu();
    });
}

async function getdepData() {
    const sql = `select dep_name, id from department;`;
    const thisGet = await query(sql);
    var holderArray = [];
    for (var i = 0; i < thisGet.length; i++) {
            var val = thisGet[i].dep_name;
            holderArray.push({name: val, value: thisGet[i].id});
        } 
    return holderArray;
}

async function getroleData() {
    const sql = `select title, id from role;`;
    const thisGet = await query(sql);
    var holderArray = [];
    for (var i = 0; i < thisGet.length; i++) {
            var val = thisGet[i].title;
            holderArray.push({name: val, value: thisGet[i].id});
        } 
    return holderArray;
}

async function getmanData() {
    const sql = `select first_name, last_name, id from employee where manager_id is NULL;`;
    const thisGet = await query(sql);
    var holderArray = [];
    for (var i = 0; i < thisGet.length; i++) {
            var val = thisGet[i].first_name;
            var valTwo = thisGet[i].last_name;
            holderArray.push({name: val + " " + valTwo, value: thisGet[i].id});
        } 
    holderArray.push({name: 'none', value: null});
    return holderArray;
}

async function getempData() {
    const sql = `select first_name, last_name, id from employee;`;
    const thisGet = await query(sql);
    var holderArray = [];
    for (var i = 0; i < thisGet.length; i++) {
        var val = thisGet[i].first_name;
        var valTwo = thisGet[i].last_name;
        holderArray.push({name: val + " " + valTwo, value: thisGet[i].id})
    }
    return holderArray;
}

async function viewExp() {
    const departments = await getdepData();
    inquirer
    .prompt([
        {
        type: 'list',
        message: "Which department would you like to know the expenditure of?",
        name: "whichDep",
        choices: [...departments],
        },
    ])
    .then((response) => {
        const dataPass = response.whichDep;
        calcRole(dataPass);
    })
}


async function calcRole(dataPass) {
    const sql = `SELECT d.dep_name AS department, d.id AS department_id, SUM(r.salary) AS departmental_salary
    FROM employee AS e 
    LEFT JOIN role AS r ON e.role_id = r.id
    LEFT JOIN department AS d ON r.department_id = d.id
    LEFT JOIN employee AS m ON e.manager_id = m.id
    GROUP BY d.id;`
    const thisGet = await query(sql);
    if (dataPass >= 1) {
        dataPass -= 1;
    }
    console.log("The total departmental salary for that Department is $" + thisGet[dataPass].departmental_salary);
    loadMenu();
}

init();