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
// asks the user what they want to do
  inquirer
  .prompt([
    {
      type: "list",
      name: "task",
      message: "Which task do you wish to perform today?",
      choices: ["Add", "View", "Update", "View entire company database"]
    }
  ]).then(response => {
    // changes the follow up inquirer questions based on their original answer
    switch(true) {
      // if the user wants to view entire company database
      case response.task === "View entire company database":
        connection.query(`SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name FROM ((employee INNER JOIN role ON employee.role_id = role.id) INNER JOIN department ON role. department_id = department.id);`, (err, res) => {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      console.log(`Name: ${res[i].first_name} ${res[i].last_name} | Title: ${res[i].title} | Department: ${res[i].name} | Salary: $${res[i].salary} \n`);
    }
  })
      break;
      // if the user chooses adda
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
            // let query = response.select.toLowerCase();
            switch (true) {
              case response.select === "Department":
                inquirer
              .prompt([
                {
                  type: "input",
                  name: "newDepartment",
                  message: "What is the name of your new department"
                }
              ]).then((res) => {
                let newDepartment = res.newDepartment;
                connection.query(`INSERT INTO department (name) VALUES("${newDepartment}") `, (err, res) => {
                  if (err) throw err;
                  console.log(`${newDepartment} added successfully!`);
                  connection.query("SELECT * FROM department;", (err, res) => {
                    if (err) throw err;
                    for (let i = 0; i < res.length; i++) {
                      console.log(`id: ${res[i].id} | department: ${res[i].name}`);
                    }
                  })
                })
              })
                break;
              case response.select === "Role":

                break;
              case response.select === "Employee":

                break;
              default:
                console.log("Uh oh, something went wrong!");
            }
          });
        break;
        // if the user chooses view
      case response.task === "View":
        inquirer
          .prompt([
            {
              type: "list",
              name: "select",
              message: "What do you want to view?",
              choices: ["Department", "Role", "Employee"]
            }
            // pulls all information from mysql db based on the choice they selected in prompt
          ]).then(response => {
            let query = response.select.toLowerCase();
            connection.query("SELECT * FROM " + query, (err, res) => {
              if (err) throw err;
              
              for (let i = 0; i < res.length; i++) {
                switch (true) {
                  case response.select === "Role":
                    console.log(`id: ${res[i].id} | title: ${res[i].title} | salary: ${res[i].salary}`);
                    break;
                  case response.select === "Department":
                    console.log(`id: ${res[i].id} | Department: ${res[i].name}`);
                    break;
                  case response.select === "Employee":
                    console.log(`Role id: ${res[i].role_id} | Name: ${res[i].first_name} ${res[i].last_name}`);
                    break;
                  default:
                    console.log("Uh oh, something went wrong!"); 
                }
                }
    
              }
            ) 
          });
        break;
        // if the user chooses update
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

// connection.query(`SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name
// FROM ((employee
// INNER JOIN role ON employee.role_id = role.id)
// INNER JOIN department ON role.department_id = department.id);`, (err, res) => {
//   if (err) throw err;
//   for (let i = 0; i < res.length; i++) {
//     console.log("Name: " + res[i].first_name + " " + res[i].last_name + " \nTitle: " + res[i].title);
//   }
// })
// };


app.listen(PORT, err => {
  console.log("App is listening on localhost: " + PORT);
});