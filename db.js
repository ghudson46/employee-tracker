const express = require('express');
const mysql = require('mysql');
const inquirer = require('inquirer');

const app = express();
const PORT = process.env.PORT || 8055;

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "12345678",

  database: "employee_tracker_db"
});


connection.connect((err, res) => {
  if (err) throw err;

  inquirer
  .prompt([
    {
      type: "list",
      name: "task",
      message: "Which task do you wish to perform today?",
      choices: ["Add", "View", "Update", "Nevermind, I don't need to do anthing"]
    }
  ]).then(response => {
    switch(true) {
      case response.task === "Add":
        inquirer
          .prompt([
            {
              type: "list",
              name: "select",
              message: "What do you want to add?",
              choices: ["Department", "Role", "Employee"]
            }
          ]).then(response => {
            console.log(response.select);
          });
        break;
      case response.task === "View":
        inquirer
          .prompt([
            {
              type: "list",
              name: "select",
              message: "What do you want to view?",
              choices: ["Department", "Role", "Employee"]
            }
          ]).then(response => {
            console.log(response.select);
          });
        break;
      case response.task === "Update":
        inquirer
          .prompt([
            {
              type: "list",
              name: "select",
              message: "What do you want to update?",
              choices: ["Department", "Role", "Employee"]
            }
          ]).then(response => {
            console.log(response.select);
          });
        break;
      case response.task === "Nevermind, I don't need to do anthing":
        console.log("Have a nice day!");
        break;
      default:
        console.log("You gotta pick one!");
    }
  });

  // runApp();
});

// const runApp = (res) => {
//   console.log(`App is running on id: ${connection.threadId}`);

//   connection.query(`SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name
//   FROM ((employee
//   INNER JOIN role ON employee.role_id = role.id)
//   INNER JOIN department ON role.department_id = department.id);`, (err, res) => {
//     if (err) throw err;
//     for (let i = 0; i < res.length; i++) {
//       console.log("Name: " + res[i].first_name + " " + res[i].last_name + " \nTitle: " + res[i].title);
//     }
//   })
// };


app.listen(PORT, err => {
  console.log("App is listening on localhost: " + PORT);
});