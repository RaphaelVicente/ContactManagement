const request = require("supertest");
const api = require("../../src/api");

class EmployeeSupport {
    async createThreeEmployee() {
        const people = (await request(api).get("/people").send()).body;
        let employees = [];
        let i = 1;

        while (i <= 3) {
            employees.push(
                await request(api).post("/employee").send({
                    username: `username${i}`,
                    password: `password${i}`,
                    occupation: `occupation${i}`,
                    personId: people[i].id
                })
            );
            i++
        }

        return employees;
    }
}

module.exports = new EmployeeSupport();