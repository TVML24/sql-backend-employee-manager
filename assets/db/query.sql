use employees_db;


-- SELECT e.id, e.first_name, e.last_name, m.first_name AS manager, r.title, r.salary, d.dep_name AS department
-- FROM employee AS e 
-- LEFT JOIN role AS r ON e.role_id = r.id
-- LEFT JOIN department AS d ON r.department_id = d.id
-- LEFT JOIN employee AS m ON e.manager_id = m.id
-- ORDER BY department;

-- select r.id, r.title, r.salary from role AS r;

select * from department;