const inquirer = require("inquirer");
const table = require("console.table");
const connection = require("./config/connection");

function firstPrompt() {
  inquirer
	.prompt({
		type: "list",
		message: "What would you like to do?",
		name: "action",
		choices: [
			"View Employees",
			"View Roles",
			"View Departments",
			"Add Employee",
			"Add Role",
			"Add Department",
			"Update Employee Role",
			"Exit"
		]
	})
	.then(function ({ action }) {
		switch (action) {
			case "View Employees":
				viewEmployees();
				break;
			case "View Roles":
				viewRoles();
				break;
			case "View Departments":
				viewDepartments();
				break;
			case "Add Employee":
				addEmployee();
				break;
			case "Add Role":
				addRole();
				break;
			case "Add Department":
				addDepartment();
				break;
			case "Update Employee Role":
				updateRole();
				break;
			case "Exit":
				connection.end();
				break;
		}
	});

}

//View Employees
function viewEmployees() {
	console.log("Employees\n");

	let query = 
		`SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary
		FROM employee e
		LEFT JOIN role r 
			ON e.role_id = r.id
		LEFT JOIN department d
		ON d.id = r.department_id;`
	
	connection.query(query, function (err ,res) {
		if (err) throw err;

		console.table(res);
	})
	firstPrompt();
}

// View Roles
function viewRoles () {
	console.log("Roles\n");

	let query = `SELECT title salary FROM role`
	
	connection.query(query, function (err, res) {
		if (err) throw err;
		console.table(res);
	})
	firstPrompt();
}

// View Departments
function viewDepartments() {
	console.log("Departments\n");

	let query = `SELECT name FROM department`

	connection.query(query, function(err, res) {
		if(err) throw err;
		console.table(res);
	})
	firstPrompt();
}

firstPrompt()