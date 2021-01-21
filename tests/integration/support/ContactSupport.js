const request = require("supertest");
const api = require("../../../src/api");
const Support = require("./Support");

class ContactSupport extends Support {
	async createContact(contact, personName) {
		const personResp = await request(api).get(`/au/people/${personName}`).set("Authorization", this.token).send();
        const person = personResp.body[0];

        if (person)
            contact.personId = person.id;
		
		return await request(api).post("/au/contact").set("Authorization", this.token).send(contact);
	}

	async getContactsFromPerson(personName) {
		const personResp = await request(api).get(`/au/people/${personName}`).set("Authorization", this.token).send();
		const person = personResp.body[0];
		
		return await request(api).get(`/au/person/${person.id}/contacts`).set("Authorization", this.token).send();
	}
}

module.exports = new ContactSupport();