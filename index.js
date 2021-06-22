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

// Add employee
function addEmployee() {
	console.log("Inserting an employee!")
  
	var query =
	  `SELECT r.id, r.title, r.salary 
		FROM role r`
  
	connection.query(query, function (err, res) {
	  if (err) throw err;
  
	  const roleChoices = res.map(({ id, title, salary }) => ({
		value: id, title: `${title}`, salary: `${salary}`
	  }));
  
	  console.table(res);
	  console.log("RoleToInsert!");
  
	  promptInsert(roleChoices);
	});
  }
  
  function promptInsert(roleChoices) {
  
	inquirer
	  .prompt([
		{
		  type: "input",
		  name: "first_name",
		  message: "What is the employee's first name?"
		},
		{
		  type: "input",
		  name: "last_name",
		  message: "What is the employee's last name?"
		},
		{
		  type: "list",
		  name: "roleId",
		  message: "What is the employee's role?",
		  choices: roleChoices
		},
	  ])
	  .then(function (answers) {
		console.log(answers);
  
		let query = `INSERT INTO employee SET ?`
		// when finished prompting, insert a new item into the db with that info
		connection.query(query,
		  {
			first_name: answers.first_name,
			last_name: answers.last_name,
			role_id: answers.roleId,
			manager_id: answers.managerId,
		  },
		  function (err, res) {
			if (err) throw err;
			viewEmployees()
  
			firstPrompt();
		  });
	  });
}

// Add Role

function addRole() {
	inquirer
	  .prompt([
		  {
			  type: "input",
			  name: "roleName",
			  message: "What is the Role you would like to add?"
		  },
		  {
			  type: "input",
			  name: "roleSalary",
			  message: "What is the salary for this role?"
		  }
		])
		.then(function (answers){
			let roleName = answers.roleName;
			let roleSalary = answers.roleSalary;
			let query = `INSERT INTO role (title, salary)
			VALUES (${roleName}, ${roleSalary});`

			connection.query(query, function(err, res) {
				if(err) throw err;
				viewRoles();
			})
			firstPrompt();
		})
};

//Add Department
function addDepartment() {
	inquirer
	  .prompt(
		  {
			  type: "input",
			  name: "deptName",
			  message: "What is the Department you would like to add?"
		  },
		)
		.then(function (answers){
			let query = `INSERT INTO department (name)
			VALUES ("${answers.deptName}");`

			connection.query(query, function(err, res) {
				if(err) throw err;
				viewDepartments();
			})
			firstPrompt();
		})
}

//Update Employees




firstPrompt()