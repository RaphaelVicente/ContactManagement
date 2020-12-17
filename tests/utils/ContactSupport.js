const request = require("supertest");
const api = require("../../src/api");

class ContactSupport {
    async createContact(person) {
        return await request(api).post("/contact").send({
            contactType: "Work",
            countryCode: 55,
            areaCode: 44,
            number: 30323032,
            email: "test1@test1.com",
            personId: person.id
        });
    }
}

module.exports = new ContactSupport();