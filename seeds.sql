-- Creates starter departments
INSERT INTO department
VALUES(1, "Management");

INSERT INTO department
VALUES(2, "Development");

INSERT INTO department
VALUES(3, "Marketing");

INSERT INTO department
VALUES(4, "Sales");

INSERT INTO department
VALUES(5, "Human Resources");

INSERT INTO department
VALUES(6, "Customer Service");

-- creates starter roles
INSERT INTO role 
VALUES(1, "Regional Manager", 150000, 1);

INSERT INTO role 
VALUES(2, "Assistant to the Regional Manager", 80000, 1);

INSERT INTO role 
VALUES(3, "Senior Developer", 130000, 2);

INSERT INTO role 
VALUES(4, "Junior Developer", 75000, 2);

INSERT INTO role 
VALUES(5, "Content Specialist", 60000, 3);

INSERT INTO role 
VALUES(6, "Inside Sales Rep", 40000, 4);

INSERT INTO role 
VALUES(7, "Outside Sales Rep", 65000, 4);

INSERT INTO role 
VALUES(8, "Human Resources Officer", 45000, 5);

INSERT INTO role 
VALUES(9, "Customer Service Rep", 35000, 6);

-- create starter employees

INSERT INTO employee
VALUES("Garrett", "Hudson", 4, 1);

INSERT INTO employee
VALUES("Michael", "Scott", 1, 1);

INSERT INTO employee
VALUES("Dwight", "Schrutt", 2, 1);

INSERT INTO employee
VALUES("Jim", "Halpert", 7, 1);

INSERT INTO employee
VALUES("Pam", "Beasley", 9, 1);

INSERT INTO employee
VALUES("Stanley", "Hudson", 7, 1);

INSERT INTO employee
VALUES("Toby", "Flenderson", 8, 1);

INSERT INTO employee
VALUES("Kevin", "Malone", 6, 1);