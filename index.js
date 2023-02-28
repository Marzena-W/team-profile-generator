const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.
const employees = [];

inquirer.prompt([
    //manager questions
    {
        type: "input",
        message: "What is your manager's name?",
        name: "name",
    },
    {
        type: "input",
        message: "What is your manager's id?",
        name: "id",
    },
    {
        type: "input",
        message: "What is your manager's email?",
        name: "email",
    },
    {
        type: "input",
        message: "What is your manager's office number?",
        name: "officeNumber",
    },
])
    .then((response) => {
        // populate manager info
        const manager = new Manager(response.name, response.id, response.email, response.officeNumber);
        employees.push(manager);
        promptForNexEmployee();
    });

const promptForNextEmployee = () => {
    inquirer.prompt([{
        // choice of 3
        type: "list",
        message: "Would you like to add another memeber? (Use arrow keys)",
        name: "nextMember",
        choices: [
            {
                name: "Engineer",
            },
            {
                name: "Intern",
            },
            {
                name: "I don't want to add more team members"
            }
        ],
    }
    ])
        .then(response => {
            if (Engineer)
                promptForEngineer()
            else if (Intern)
                promptForIntern()
            else
                //  use the functionality from page-template to generate the team
                buildPage()
        });
};

const promptForEngineer = () => {
    inquirer.prompt([{
        //engineer questions
        type: "input",
        message: "What is your engineer's name?",
        name: "name",
    },
    {
        type: "input",
        message: "What is your engineer's id?",
        name: "id",
    },
    {
        type: "input",
        message: "What is your engineer's email?",
        name: "email",
    },
    {
        type: "input",
        message: "What is your engineer's GitHub username?",
        name: "github",
    },
    ])
        .then((response) => {
            // populate manager info
            const engineer = new Engineer(response.name, response.id, response.email, response.userName);    
            employees.push(engineer);
            promptForNextEmployee()
        })
}

const promptForIntern = () => {
    inquirer.prompt([
        {
            //intern questions
            type: "input",
            message: "What is your intern's name?",
            name: "name",
        },
        {
            type: "input",
            message: "What is your engineer's id?",
            name: "id",
        },
        {
            type: "input",
            message: "What is your engineer's email?",
            name: "email",
        },
        {
            type: "input",
            message: "What is your engineer's school?",
            name: "school",
        },
    ]).then((response) => {
        // populate manager info
        const intern = new Intern(response.name, response.id, response.email, response.school);
        employees.push(intern);
        promptForNextEmployee();
    });
};

const buildPage = () => {
    fs.writeToFile(outputPath, render(employees))
}