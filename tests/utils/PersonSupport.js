const request = require("supertest");
const api = require("../../src/api");

class PersonSupport {
    async createPerson() {
        return await request(api).post("/person").send({
            name: "Luke",
            birthDate: "1977-11-18",
            type: "Individual"
        });
    }

    async createFivePeople() {
        let people = [];
        let entries = [
			{ name: "Smith", birthDate: "1989-02-10", type: "Individual" },
			{ name: "John", birthDate: "1992-07-21", type: "Individual" },
			{ name: "Lara", birthDate: "1990-05-09", type: "Individual" },
			{ name: "Michael", birthDate: "1998-01-25", type: "Individual" },
			{ name: "Luke", birthDate: "1977-11-18", type: "Individual" }
        ];
        
        entries.forEach(async person => people.push(await request(api).post("/person").send(person)));

        return people;
    }

    async findPeopleByName(name) {
        return await request(api).get(`/people/${name}`).send();
    }
}

module.exports = new PersonSupport();