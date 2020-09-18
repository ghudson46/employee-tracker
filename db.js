const express = require('express');
const mysql = require('mysql');
const inquirer = require('inquirer');
require('console.table');
const Table = require('cli-table');

const app = express();
const PORT = process.env.PORT || 8055;

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "12345678",

  database: "employee_tracker_db"
});



function runApp() {

  connection.connect((err, res) => {
    if (err) throw err;
  // asks the user what they want to do
  console.log(`
  
  
  /$$$$$$$$ /$$      /$$ /$$$$$$$  /$$        /$$$$$$  /$$     /$$/$$$$$$$$ /$$$$$$$$       /$$$$$$$$/$$$$$$$   /$$$$$$   /$$$$$$  /$$   /$$ /$$$$$$$$ /$$$$$$$ 
  | $$_____/| $$$    /$$$| $$__  $$| $$       /$$__  $$|  $$   /$$/ $$_____/| $$_____/      |__  $$__/ $$__  $$ /$$__  $$ /$$__  $$| $$  /$$/| $$_____/| $$__  $$
  | $$      | $$$$  /$$$$| $$  \\ $$| $$      | $$  \\ $$ \\  $$ /$$/| $$      | $$               | $$  | $$  \\ $$| $$  \\ $$| $$  \\__/| $$ /$$/ | $$      | $$  \\ $$
  | $$$$$   | $$ $$/$$ $$| $$$$$$$/| $$      | $$  | $$  \\  $$$$/ | $$$$$   | $$$$$            | $$  | $$$$$$$/| $$$$$$$$| $$      | $$$$$/  | $$$$$   | $$$$$$$/
  | $$__/   | $$  $$$| $$| $$____/ | $$      | $$  | $$   \\  $$/  | $$__/   | $$__/            | $$  | $$__  $$| $$__  $$| $$      | $$  $$  | $$__/   | $$__  $$
  | $$      | $$\\  $ | $$| $$      | $$      | $$  | $$    | $$   | $$      | $$               | $$  | $$  \\ $$| $$  | $$| $$    $$| $$\\  $$ | $$      | $$  \\ $$
  | $$$$$$$$| $$ \\/  | $$| $$      | $$$$$$$$|  $$$$$$/    | $$   | $$$$$$$$| $$$$$$$$         | $$  | $$  | $$| $$  | $$|  $$$$$$/| $$ \\  $$| $$$$$$$$| $$  | $$
  |________/|__/     |__/|__/      |________/ \\______/     |__/   |________/|________/         |__/  |__/  |__/|__/  |__/ \\______/ |__/  \\__/|________/|__/  |__/
                                                                                                                                                                 
                                                                                                                                                                 
                                                                                                                                                                 
  
  
  `);
  

  inquirer
  .prompt([
    {
      type: "list",
      name: "task",
      message: "Which task do you wish to perform today?",
      choices: ["Add", "View", "Update Employee Roles", "Update Employee Manager",  "View entire company database", "All Done"]
    }
  ]).then(response => {
    // changes the follow up inquirer questions based on their original answer
    switch(true) {
      // if the user wants to view entire company database
      case response.task === "View entire company database":
        connection.query(`SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name FROM ((employee INNER JOIN role ON employee.role_id = role.id) INNER JOIN department ON role. department_id = department.id);`, (err, res) => {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      var companyTable = new Table({
        head: ['fist name', 'last name', 'title', 'salary', 'department'],
        colWidths: [30, 30, 30, 30, 30]
      });

      companyTable.push(
        [res[i].first_name, res[i].last_name, res[i].title, res[i].salary, res[i].name]
      );

      console.log(companyTable.toString());
      // console.log(`Name: ${res[i].first_name} ${res[i].last_name} | Title: ${res[i].title} | Department: ${res[i].name} | Salary: $${res[i].salary} \n`);

      // console.table(res[i]);
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
                      // console.log(`id: ${res[i].id} | department: ${res[i].name}`);

                      // console.table(res[i]);

                      var addDepartmentTable = new Table({
                        head: ['ID', 'DEPARTMENT'],
                        colWidths: [30, 30]
                      });
                
                      addDepartmentTable.push(
                        [res[i].id, res[i].name]
                      );
                
                      console.log(addDepartmentTable.toString());
                    }
                    
                  })
                })
               
              })
                break;
              case response.select === "Role":
                let departmentArray = [];
                connection.query("SELECT * FROM department;", (err, res) => {
                  if (err) throw err;
                  res.forEach((element) => {
                    departmentArray.push(`${element.id} ${element.name}`);
                  });
                })
                inquirer
                .prompt([
                {
                  type: "input",
                  name: "newRole",
                  message: "What is the title of your new role"
                },
                {
                  type: "input",
                  name: "salary",
                  message: "What salary will be the salary of this new role?"
                },
                {
                  type: "list",
                  name: "departmentId",
                  message: "What department is this role a part of?",
                  choices: departmentArray
                }
              ]).then((res) => {
                let newRole = res.newRole;
                // salary without comma
                let salary = res.salary;
                var finalSalary = Number(salary.replace(/[^0-9\.-]+/g,""));

                let department = res.departmentId;
                // Id number for department_id
                let departmentNumber = parseInt(department.slice(0, 2));

                connection.query(`INSERT INTO role (title, salary, department_id) VALUES("${newRole}", ${finalSalary}, ${departmentNumber}) `, (err, res) => {
                  if (err) throw err;
                  console.log(`${newRole} added successfully!`);
                  connection.query("SELECT * FROM role LEFT JOIN department ON role.department_id = department.id;", (err, res) => {
                    if (err) throw err;
                    for (let i = 0; i < res.length; i++) {
                      // console.log(`title: ${res[i].title} | salary: $${res[i].salary} | department ID: ${res[i].name}`);

                      // console.table(res[i]);

                      var addRoleTable = new Table({
                        head: ['TITLE', 'SALARY', 'DEPARTMENT'],
                        colWidths: [30, 30, 30]
                      });
                
                      addRoleTable.push(
                        [res[i].title, res[i].salary, res[i].name]
                      );
                
                      console.log(addRoleTable.toString());
                    }
                  })
                })
              })
                break;
              case response.select === "Employee":
               let roleArray = [];
               connection.query("SELECT id, title FROM role", (err, res) => {
                 if (err) throw err;

                 res.forEach((element) => {
                   roleArray.push(`${element.id} ${element.title}`);
                 });
               });
               let managerArray = [];
               connection.query("SELECT id, name FROM manager", (err, res) => {
                if (err) throw err;

                res.forEach((element) => {
                  managerArray.push(`${element.id} ${element.name}`);
                });
              });
                inquirer
                .prompt([
                {
                  type: "input",
                  name: "firstName",
                  message: "What is the first name of your new employee"
                },
                {
                  type: "input",
                  name: "lastName",
                  message: "What is the last name of your new employee"
                },
                {
                  type: "list",
                  name: "role",
                  message: "What is this employee's role?",
                  choices: roleArray
                },
                {
                  type: "list",
                  name: "manager",
                  message: "Who is this employee's manager?",
                  choices: managerArray
                }
              ]).then((res) => {
                let employeeName = res.firstName + " " + res.lastName;
                let employeeRole = res.role.slice(2);
                let employeeRoleId = parseInt(res.role.slice(0,1));
                let manager = res.manager.slice(2);
                let managerId = parseInt(res.manager.slice(0, 1));

                // console.log(`${employeeName} \n ${employeeRoleId} \n ${employeeRole} \n ${managerId} \n ${manager}`);
                

                connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES("${res.firstName}", "${res.lastName}", ${employeeRoleId}, ${managerId}) `, (err, res) => {
                  if (err) throw err;
                  console.log(`${employeeName} (${employeeRole}) added successfully!`);
                  connection.query(`SELECT employee.first_name, employee.last_name, role.title, manager.name FROM ((employee INNER JOIN role ON employee.role_id = role.id) INNER JOIN manager ON employee.manager_id = manager.id);`, (err, res) => {
                    if (err) throw err;
                    for (let i = 0; i < res.length; i++) {
                      // console.log(`Name: ${res[i].first_name} ${res[i].last_name} | Role: ${res[i].role_id} | Manager: ${res[i].manager_id}`);

                      // console.table(res[i]);

                      var addEmployeeTable = new Table({
                        head: ['NAME', 'ROLE', 'MANAGER'],
                        colWidths: [30, 30, 30]
                      });
                
                      addEmployeeTable.push(
                        [res[i].first_name + " " +  res[i].last_name, res[i].title, res[i].name]
                      );
                
                      console.log(addEmployeeTable.toString());
                    }
                    
                  })
                })
              })
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
                    // console.log(`id: ${res[i].id} | title: ${res[i].title} | salary: ${res[i].salary}`);

                    // console.table(res[i]);

                    var viewRoleTable = new Table({
                      head: ['ID', 'ROLE', 'SALARY'],
                      colWidths: [30, 30, 30]
                    });
              
                    viewRoleTable.push(
                      [res[i].id, res[i].title, res[i].salary]
                    );
              
                    console.log(viewRoleTable.toString());                    
                    break;
                  case response.select === "Department":
                    // console.log(`id: ${res[i].id} | Department: ${res[i].name}`);

                    // console.table(res[i]);

                    var viewDepartmentTable = new Table({
                      head: ['ID', 'DEPARTMENT'],
                      colWidths: [30, 30]
                    });
              
                    viewDepartmentTable.push(
                      [res[i].id, res[i].name]
                    );
              
                    console.log(viewDepartmentTable.toString());

                    break;
                  case response.select === "Employee":
                    // console.log(`Role id: ${res[i].role_id} | Name: ${res[i].first_name} ${res[i].last_name}`);

                    // console.table(res[i]);

                    var viewEmployeeTable = new Table({
                      head: ['NAME'],
                      colWidths: [50]
                    });
              
                    viewEmployeeTable.push(
                      [res[i].first_name + " " +  res[i].last_name]
                    );
              
                    console.log(viewEmployeeTable.toString());
                    break;
                  default:
                    console.log("Uh oh, something went wrong!"); 
                }
                }
    
              }
            ) 
          });
        break;
        // if the user chooses update role
      case response.task === "Update Employee Roles":
        let employeeArray = [];
        connection.query("SELECT * FROM employee;", (err, res) => {
          if (err) throw err;
          res.forEach((element) => {
            employeeArray.push(`${element.id}) ${element.first_name} ${element.last_name}`);
          });
          let roleArray = [];
               connection.query("SELECT id, title FROM role", (err, res) => {
                 if (err) throw err;

                 res.forEach((element) => {
                   roleArray.push(`${element.id}) ${element.title}`);
                 });
               });
          inquirer
            .prompt([
              {
                type: "list",
                name: "employee",
                message: "Which employee's role do you want to update?",
                choices: employeeArray
              },
              {
                type: "list",
                name: "newRole",
                message: "What is their new role?",
                choices: roleArray
              }
            ]).then(result => {
              let roleSplit = result.newRole.split(")");
              let role = roleSplit[1];
              let roleId = Number(roleSplit[0]);
              let employeeSplit = result.employee.split(")");
              let employeeName = employeeSplit[1];
              let employeeId = Number(employeeSplit[0]);
              
              connection.query(`UPDATE employee SET role_id = ${roleId} WHERE id = ${employeeId};`, (err, res) => {
                if (err) throw err;

                console.log(`\n \n \n ${employeeName} was successfully promoted to${role}!`);
                
              //   connection.query(`SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name FROM ((employee INNER JOIN role ON employee.role_id = role.id) INNER JOIN department ON role. department_id = department.id);`, (err, res) => {
              //     if (err) throw err;
              //     for (let i = 0; i < res.length; i++) {
              //       // console.log(`Name: ${res[i].first_name} ${res[i].last_name} | Title: ${res[i].title} | Department: ${res[i].name} | Salary: $${res[i].salary} \n`);

              //       // console.table(res[i]);

              //       var updateRoleTable = new Table({
              //         head: ['NAME', 'ROLE', 'DEPARTMENT', 'SALARY'],
              //         colWidths: [30, 30, 30, 30]
              //       });
              
              //       updateRoleTable.push(
              //         [res[i].first_name + " " +  res[i].last_name, res[i].title, res[i].name, res[i].salary]
              //       );
              
              //       console.log(updateRoleTable.toString());
              //     }
              //   })
              })
            })
        })
        break;
      // if user chooses to update employee manager
      case response.task === "Update Employee Manager":
        let employeeList = [];
        connection.query("SELECT * FROM employee;", (err, res) => {
          if (err) throw err;
          res.forEach((element) => {
            employeeList.push(`${element.id}) ${element.first_name} ${element.last_name}`);
          });
          let managerList = [];
               connection.query("SELECT id, name FROM manager", (err, res) => {
                 if (err) throw err;

                 res.forEach((element) => {
                   managerList.push(`${element.id}) ${element.name}`);
                 });
               });
          inquirer
            .prompt([
              {
                type: "list",
                name: "employee",
                message: "Which employee's manager do you want to update?",
                choices: employeeList
              },
              {
                type: "list",
                name: "manager",
                message: "Who is their new manager?",
                choices: managerList
              }
            ]).then(result => {
              let managerSplit = result.manager.split(")");
              let manager = managerSplit[1];
              let managerId = Number(managerSplit[0]);
              let employeeSplit = result.employee.split(")");
              let employeeName = employeeSplit[1];
              let employeeId = Number(employeeSplit[0]);
              
              connection.query(`UPDATE employee SET manager_id = ${managerId} WHERE id = ${employeeId};`, (err, res) => {
                if (err) throw err;

                console.log(`\n \n \n ${employeeName} is now being managed by ${manager}!`);
                
                // connection.query(`SELECT first_name, last_name, manager_id, name FROM employee LEFT JOIN manager ON employee.manager_id = manager.id;`, (err, res) => {
                //   if (err) throw err;
                //   for (let i = 0; i < res.length; i++) {
                //     // console.log(`Name: ${res[i].first_name} ${res[i].last_name} | Title: ${res[i].title} | Department: ${res[i].name} | Salary: $${res[i].salary} \n`);

                //     // console.table(res[i]);

                //     var updateManagerTable = new Table({
                //       head: ['NAME', 'ROLE', 'MANAGER'],
                //       colWidths: [30, 30, 30]
                //     });
              
                //     updateManagerTable.push(
                //       [res[i].first_name + " " +  res[i].last_name, res[i].title, res[i].name]
                //     );
              
                //     console.log(updateManagerTable.toString());

                //   }
                // })
              })
            })
        })
        break;
        // if user is done using the app
      case response.task === "All Done":
        console.log("Have a nice day!");
        break;
      default:
        console.log("Please choose one of the selections");
    }
  });

})
};




app.listen(PORT, err => {
  console.log("App is listening on localhost: " + PORT);
});

runApp();