const request = require("supertest");
const api = require("../../src/api");

class PersonSupport {
    async createPerson() {
        return await request(api).post("/person").send({
            name: "Test1",
            birthDate: "1989-05-01",
            type: "Individual"
        });
    }

    async createFivePeople() {
        var people = [];
        var i = 1;

        while (i <= 5) {
            people.push(
                await request(api).post("/person").send({
                    name: `Test${i}`,
                    birthDate: `1989-0${i}-0${i}`,
                    type: "Individual"
                })
            );
            i++
        }

        return people;
    }

    async createThreeEmployee() {
        const people = (await request(api).get("/people").send()).body;
        var employees = [];
        var i = 7;

        while (i <= 9) {
            employees.push(
                await request(api).post("/employee").send({
                    username: `username${i}`,
                    password: `password${i}`,
                    occupation: `occupation${i}`,
                    personId: people[i-6].id
                })
            );
            i++
        }

        return employees;
    }

    async findPeopleByName(name) {
        return await request(api).get(`/people/${name}`).send();
    }
}

module.exports = new PersonSupport();