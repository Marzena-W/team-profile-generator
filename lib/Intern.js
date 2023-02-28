// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Intern extends Employee{
    constructor(name, id, email, github, school) {
        super(name, id, email);
        this.github = github;
        this.school = school;
    }
}

module.exports = Intern;