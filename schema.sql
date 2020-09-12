CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE employee (
  first_name varchar(30),
  last_name varchar(30),
  role_id int 
  manager_id int
);

CREATE TABLE role (
  title varchar(30),
  salary decimal,
  department_id int
);

CREATE TABLE department (
  name varchar(30)
);