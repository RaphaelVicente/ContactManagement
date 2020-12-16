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
        let people = [];
        let i = 1;

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

    async findPeopleByName(name) {
        return await request(api).get(`/people/${name}`).send();
    }
}

module.exports = new PersonSupport();