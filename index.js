const inquirer = require("inquirer");
const table = require("console.table");
const connection = require("./config/connection");


connection.connect(function (err) {
	if (err) throw err;
	firstPrompt();
})

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