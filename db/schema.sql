CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE employee (
  first_name varchar(30),
  last_name varchar(30),
  role_id int,
  manager_id int
);

CREATE TABLE role (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title varchar(30),
  salary decimal,
  department_id int
);

CREATE TABLE department (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name varchar(30)
);

CREATE TABLE manager (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name varchar(50)
);
