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
    .then(response => {
        // populate manager info
        console.log(response)

        promptForNexEmployee()
    })

const promptForNextEmployee = () => {
    inquirer.prompt([{
        // choice of 3
        type: "list",
        message: "Would you like to add another memeber? (Use arrow keys)",
        name: "nextMember",
        choices: ["Engineer", "Intern", "I don't want to add more team members"],
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
        })
}

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
        .then(response => {
            // add new engineer to employees array
            console.log(response)

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
    ]).then(response => {
        // add new intern to employees array
        console.log(response)

        promptForNextEmployee()
    })
}

const buildPage = () => {
    inquirer.prompt()
    .then(response => {
        console.log(response)
        writeToFile("team.html", outputPath)
    })
    render(employees)
}

buildPage();