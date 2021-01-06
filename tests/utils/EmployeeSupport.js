const request = require("supertest");
const api = require("../../src/api");

class EmployeeSupport {
    async createThreeEmployees() {
        const response = await request(api).get("/people").send();
        const people = response.body;
        let employees = [];
        let entries = [
			{ username: "UsernameJohn", password: "passwordjohn", occupation: "salesman", personId: people[0].id },
			{ username: "UsernameLara", password: "passwordlara", occupation: "manager", personId: people[1].id },
			{ username: "UsernameLuke", password: "passwordluke", occupation: "salesman", personId: people[2].id }
        ];

        entries.forEach(async employee => employees.push(await request(api).post("/employee").send(employee)));

        return employees;
    }
}

module.exports = new EmployeeSupport();