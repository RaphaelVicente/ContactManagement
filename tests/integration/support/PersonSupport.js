const request = require("supertest");
const api = require("../../../src/api");

class PersonSupport {
    async createPerson(token) {
        return await request(api).post("/au/person").set('Authorization', token).send({
            name: "Luke",
            birthDate: "1977-11-18",
            type: "Individual"
        });
    }

    async createFivePeople(token) {
        let people = [];
        let entries = [
            { name: "John", birthDate: "1992-07-21", type: "Individual" },
            { name: "Lara", birthDate: "1990-05-09", type: "Individual" },
            { name: "Luke", birthDate: "1977-11-18", type: "Individual" },
			{ name: "Smith", birthDate: "1989-02-10", type: "Individual" },
			{ name: "Michael", birthDate: "1998-01-25", type: "Individual" }
        ];
        
        for (let person of entries)
            people.push(await request(api).post("/au/person").set('Authorization', token).send(person))

        return people;
    }

    async findPeopleByName(name, token) {
        return await request(api).get(`/au/people/${name}`).set('Authorization', token).send();
    }
}

module.exports = new PersonSupport();