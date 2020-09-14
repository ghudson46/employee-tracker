CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE employee (
  first_name varchar(30),
  last_name varchar(30),
  role_id int,
  manager_id int
);

CREATE TABLE role (
  id INT PRIMARY KEY,
  title varchar(30),
  salary decimal,
  department_id int
);

CREATE TABLE department (
  id INT PRIMARY KEY,
  name varchar(30)
);

INSERT INTO employee
VALUES("Garrett", "Hudson", 1, 3);

INSERT INTO role
VALUES(1, "Engineer", 150000, 5);

INSERT INTO department
VALUES(5, "Development");


-- joins the 3 tables where employee role id is equal to the id of the role table and the role tables department id is equaL to department id

SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name
FROM ((employee
INNER JOIN role ON employee.role_id = role.id)
INNER JOIN department ON role.department_id = department.id);
