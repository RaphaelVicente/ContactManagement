const request = require("supertest");

const api = require("../../src/api");
const truncate = require("../utils/truncate");
const PersonSupport = require("../utils/PersonSupport");
const ContactSupport = require("../utils/ContactSupport");

beforeEach(async () => {
	await truncate();
	await PersonSupport.createPerson();
});

test("Create contact", async () => {
	const person = (await PersonSupport.findPeopleByName("Luke")).body[0];

	const response = await request(api).post("/contact").send({
		contactType: "Work",
		countryCode: 55,
		areaCode: 44,
		number: 30323032,
		email: "luke@test.com",
		personId: person.id
	});

	expect(response.status).toBe(200);
	expect(response.body.contactType).toBe("Work");
	expect(response.body.countryCode).toBe(55);
	expect(response.body.areaCode).toBe(44);
	expect(response.body.number).toBe(30323032);
	expect(response.body.email).toBe("luke@test.com");
});

test("Return all contacts from person", async () => {
	const person = (await PersonSupport.findPeopleByName("Luke")).body[0];
	await ContactSupport.createContact(person);
	const response = await request(api).get(`/person/${person.id}/contacts`).send();

	expect(response.status).toBe(200);
	expect(response.body.name).toBe("Luke")
	expect(response.body.personContacts).toHaveLength(1);
	expect(response.body.personContacts[0].contactType).toBe("Work");
	expect(response.body.personContacts[0].countryCode).toBe(55);
	expect(response.body.personContacts[0].areaCode).toBe(44);
	expect(response.body.personContacts[0].number).toBe(30323032);
	expect(response.body.personContacts[0].email).toBe("luke@test.com");
});

test("Create contact without email", async () => {
	const person = (await PersonSupport.findPeopleByName("Luke")).body[0];

	const response = await request(api).post("/contact").send({
		contactType: "Work",
		countryCode: 55,
		areaCode: 44,
		number: 30323032,
		personId: person.id
	});

	expect(response.status).toBe(200);
	expect(response.body.contactType).toBe("Work");
	expect(response.body.countryCode).toBe(55);
	expect(response.body.areaCode).toBe(44);
	expect(response.body.number).toBe(30323032);
	expect(response.body.email).toBe(undefined);
});

test("It does not create contact without contact type", async () => {
	const person = (await PersonSupport.findPeopleByName("Luke")).body[0];

	const response = await request(api).post("/contact").send({
		countryCode: 55,
		areaCode: 44,
		number: 30323032,
		email: "luke@test.com",
		personId: person.id
	});

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(1);
	expect(response.body.errors[0]).toBe("Field 'Contact Type' must be filled");
});

test("It does not create contact without country code", async () => {
	const person = (await PersonSupport.findPeopleByName("Luke")).body[0];

	const response = await request(api).post("/contact").send({
		contactType: "Work",
		areaCode: 44,
		number: 30323032,
		email: "luke@test.com",
		personId: person.id
	});

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(2);
	expect(response.body.errors[0]).toBe("Field 'Country Code' must be filled");
	expect(response.body.errors[1]).toBe("'Country Code' must contain only numbers");
});

test("It does not create contact without area code", async () => {
	const person = (await PersonSupport.findPeopleByName("Luke")).body[0];

	const response = await request(api).post("/contact").send({
		contactType: "Work",
		countryCode: 55,
		number: 30323032,
		email: "luke@test.com",
		personId: person.id
	});

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(2);
	expect(response.body.errors[0]).toBe("Field 'Area Code' must be filled");
	expect(response.body.errors[1]).toBe("'Area Code' must contain only numbers");
});

test("It does not create contact without number", async () => {
	const person = (await PersonSupport.findPeopleByName("Luke")).body[0];

	const response = await request(api).post("/contact").send({
		contactType: "Work",
		countryCode: 55,
		areaCode: 44,
		email: "luke@test.com",
		personId: person.id
	});

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(2);
	expect(response.body.errors[0]).toBe("Field 'Number' must be filled");
	expect(response.body.errors[1]).toBe("'Number' must contain only numbers");
});

test("It does not create contact without person", async () => {
	const person = (await PersonSupport.findPeopleByName("Luke")).body[0];

	const response = await request(api).post("/contact").send({
		contactType: "Work",
		countryCode: 55,
		areaCode: 44,
		number: 30323032,
		email: "luke@test.com"
	});

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(1);
	expect(response.body.errors[0]).toBe("Field 'Person Id' must be filled");
});

test("It does not create contact with invalid email", async () => {
	const person = (await PersonSupport.findPeopleByName("Luke")).body[0];

	const response = await request(api).post("/contact").send({
		contactType: "Work",
		countryCode: 55,
		areaCode: 44,
		number: 30323032,
		email: "@",
		personId: person.id
	});

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(1);
	expect(response.body.errors[0]).toBe("Invalid 'E-mail'");
});