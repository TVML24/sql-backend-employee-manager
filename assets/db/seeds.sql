INSERT INTO department (dep_name)
VALUES ("Engineering"),
       ("Design"),
       ("Marketing"),
       ("Legal"),
       ("Human Resources"),
       ("Maintainance"),
       ("Special or Misc");
       
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 120000, 1),
       ("Junior Engineer", 80000, 1),
       ("Cloud Engineer", 90000, 1),
       ("Artist", 65000, 2),
       ("Design Lead", 75000, 2),
       ("Marketing Lead", 75000, 3),
       ("Marketing Analyst", 70000, 3),
       ("Legal Lead", 90000, 4),
       ("Legal Staff", 75000, 4),
       ("Human Resources Lead", 90000, 5),
       ("Human Resources Analyst", 75000, 5),
       ("Cleaner", 55000, 6),
       ("Warehouse Staff", 55000, 7),
       ("Security", 60000, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mohammed", "Ali", 1, null),
       ("Sonny", "Liston", 2, 1),
       ("George", "Foreman", 3, 1),
       ("Joe", "Frazier", 5, null),
       ("Jack", "Johnson", 4, 4),
       ("Joe", "Louis", 6, null),
       ("Larry", "Holmes", 7, 6),
       ("Jack", "Dempsey", 8, null),
       ("Floyd", "Patterson", 9, 8),
       ("Max", "Schmeling", 10, null),
       ("James J", "Jeffries", 11, 10),
       ("Mike", "Tyson", 12, 10),
       ("James J", "Corbett", 13, 10),
       ("Roy", "Jones Jr", 14, 10);

Select * from employee;
Select * from role;
select * from department;