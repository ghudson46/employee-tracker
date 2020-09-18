-- Creates starter departments
INSERT INTO department (name)
VALUES("Management");

INSERT INTO department (name)
VALUES("Development");

INSERT INTO department (name)
VALUES("Marketing");

INSERT INTO department (name)
VALUES("Sales");

INSERT INTO department (name)
VALUES("Human Resources");

INSERT INTO department (name)
VALUES("Customer Service");



-- creates starter roles
INSERT INTO role (title, salary, department_id)
VALUES("Manager", 150000, 1);

INSERT INTO role (title, salary, department_id)
VALUES("Assistant Manager", 80000, 1);

INSERT INTO role (title, salary, department_id)
VALUES("Senior Developer", 130000, 2);

INSERT INTO role (title, salary, department_id)
VALUES("Junior Developer", 75000, 2);

INSERT INTO role (title, salary, department_id)
VALUES("Web Designer", 60000, 2);

INSERT INTO role (title, salary, department_id)
VALUES("Inside Sales Rep", 40000, 4);

INSERT INTO role (title, salary, department_id)
VALUES("Outside Sales Rep", 65000, 4);

INSERT INTO role (title, salary, department_id)
VALUES("Human Resources Officer", 45000, 5);

INSERT INTO role (title, salary, department_id)
VALUES("Customer Service Rep", 35000, 6);

-- create starter employees


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Creed", "Bratton", 1, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Dwight", "Schrutt", 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Jim", "Halpert", 7, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Pam", "Beasley", 9, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Stanley", "Hudson", 7, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Toby", "Flenderson", 8, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Kevin", "Malone", 6, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Kelly", "Capur", 4, 2);

-- create starter managers

INSERT INTO manager (name)
VALUES("Michael Scott");

INSERT INTO manager (name)
VALUES("Robert California");

INSERT INTO manager (name)
VALUES("Deangelo Vickers");

