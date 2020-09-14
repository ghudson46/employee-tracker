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
}