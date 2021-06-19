USE employeesDB;

INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Finance");
INSERT INTO department (name)
VALUES ("Legal");


INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 80000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Account Manager", 150000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 125000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 250000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)

VALUES ("Jane", "Doe", 1, null); 
INSERT INTO employee (first_name, last_name, role_id, manager_id)

VALUES ("Ryan", "Murphy", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)

VALUES ("James", "Bond", 2, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)

VALUES ("Carrie", "Bradshaw", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)

VALUES ("Maggie", "Smith", 4, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)

VALUES ("Gigi", "Gorgeous", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)

VALUES ("James", "Baldwin", 6, 6);
INSERT INTO employee (first_name, last_name, role_id, manager_id)

VALUES ("Tom", "Ford", 7, null);