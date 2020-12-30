const request = require("supertest");

const api = require("../../src/api");
const truncate = require("../utils/truncate");
const PersonSupport = require("../utils/PersonSupport");
const ContactSupport = require ("../utils/ContactSupport");

beforeEach(async () => {
	await truncate();
	await PersonSupport.createPerson();
});

test("Create contact", async () => {
    const person = (await PersonSupport.findPeopleByName("Test1")).body[0];

	const response = await request(api).post("/contact").send({
        contactType: "Work",
        countryCode: 55,
        areaCode: 44,
        number: 30323032,
        email: "test1@test1.com",
		personId: person.id
	});

	expect(response.status).toBe(200);
    expect(response.body.contactType).toBe("Work");
    expect(response.body.countryCode).toBe(55);
    expect(response.body.areaCode).toBe(44);
    expect(response.body.number).toBe(30323032);
    expect(response.body.email).toBe("test1@test1.com");
});

test("Return all contacts from person", async () => {
    const person = (await PersonSupport.findPeopleByName("Test1")).body[0];
    await ContactSupport.createContact(person);
    const response = await request(api).get(`/person/${person.id}/contacts`).send();

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Test1")
    expect(response.body.personContacts).toHaveLength(1);
    expect(response.body.personContacts[0].contactType).toBe("Work");
    expect(response.body.personContacts[0].countryCode).toBe(55);
    expect(response.body.personContacts[0].areaCode).toBe(44);
    expect(response.body.personContacts[0].number).toBe(30323032);
    expect(response.body.personContacts[0].email).toBe("test1@test1.com");
});