const express = require('express');
const mysql = require('mysql');
const inquirer = require('inquirer');

const app = express();
const PORT = 8080;

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "12345678",

  database: "employee_tracker_db"
});

connection.connect((err, res) => {
  if (err) throw err;

  runApp();
});

const runApp = (res) => {
  console.log(`App is running on id: ${connection.threadId}`);

  connection.query(`SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name
  FROM ((employee
  INNER JOIN role ON employee.role_id = role.id)
  INNER JOIN department ON role.department_id = department.id);`, (err, res) => {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      console.log("Name: " + res[i].first_name + " " + res[i].last_name + " \nTitle: " + res[i].title);
    }
  })
}