
const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");

const db = mysql.createConnection(
    {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'password',
        database: 'employ_db'
    },
    console.log(`Connected to the employ_db database.`)
);

db.connect(function (err) {
    if (err) throw err;
    console.log("now listening on port 3306")
    runDB()
});


function runDB() {
    inquirer.prompt([
        {
            type: "list",
            message: "what would you like to do?",
            name: "action",
            choices: [
                "View Departments",
                "View Roles",
                "View Employees",
                "Add a Department",
                "Add a Role",
                "Add an Employee",
                "Update an Employee",
            ]

        }

    ]).then(function (choices) {
        switch (choices.action) {
            case "View Departments":
                viewDepartments()
                break;
            case "View Roles":
                viewRoles()
                break;
            case "View Employees":
                viewEmployees()
                break;
            case "Add a Department":
                addDepartment()
                break;
            case "Add a Role":
                addRole()
                break;
            case "Add an Employee":
                addEmployee()
                break;
            case "Update an Employee":
                updateEmployee()
                break;
        }
    })
}


function addDepartment() {
    inquirer.prompt({
        type: "input",
        message: "Input Department Name",
        name: "departmentName"
    }).then(function (choice) {
        db.query("INSERT INTO department (name) VALUES (?)", [choice.departmentName], function (err, res) {
            if (err) throw err;
            console.table(res)
            runDB()
        })
    }

    )
}
function addRole() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Input the role name.",
                name: "roleName"
            },
            {
                type: "input",
                message: "Input the role salary.",
                name: "salaryTotal"
            },
            {
                type: "input",
                message: "Input the department.",
                name: "deptID"
            }
        ])
        .then(function (choice) {


            db.query("INSERT INTO roles (title, salary, department_name) VALUES (?, ?, ?)", [choice.roleName, choice.salaryTotal, choice.deptID], function (err, res) {
                if (err) throw err;
                console.table(res);
                runDB()
            })
        })
};

function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Input the employee's first name.",
                name: "FirstName"
            },
            {
                type: "input",
                message: "Input the employee's last name.",
                name: "LastName"
            },
            {
                type: "input",
                message: "Input the employee role.",
                name: "roleID"
            },
            {
                type: "input",
                message: "Input the manager's name.",
                name: "managerID"
            }
        ])
        .then(function (choice) {


            db.query("INSERT INTO employee (first_name, last_name, role_name, manager_name) VALUES (?, ?, ?, ?)", [choice.FirstName, choice.LastName, choice.roleID, choice.managerID], function (err, res) {
                if (err) throw err;
                console.table(res);
                runDB()
            });
        })
};

function viewDepartments() {
    var depQuery = "SELECT * FROM department";
    db.query(depQuery, function (err, res) {
        if (err) throw err;
        console.table(res);
        runDB()
    });
}

function viewRoles() {
    var roleQuery = "SELECT * FROM roles";
    db.query(roleQuery, function (err, res) {
        if (err) throw err;
        console.table(res);
        runDB()
    });
}

function viewEmployees() {
    var employeeQuery = "SELECT * FROM employee";
    db.query(employeeQuery, function (err, res) {
        if (err) throw err;
        console.table(res);
        runDB()
    });
}

function updateEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Input an employee to update",
                name: "update"
            },

            {
                type: "input",
                message: "What do you want to change the role to?",
                name: "updateRole"
            }
        ])
        .then(function (choice) {
            db.query('UPDATE employee SET role_name=? WHERE first_name= ?', [choice.updateRole, choice.update], function (err, res) {
                if (err) throw err;
                console.table(res);
                runDB();
            });
        });
}