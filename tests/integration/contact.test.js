const PersonCreated = require("./environment/PersonCreated");
const ContactSupport = require("./support/ContactSupport");

beforeEach(async () => {
	await PersonCreated.start();
	await ContactSupport.authenticateEmployee();
	await ContactSupport.createContact({
		contactType: "Private",
		countryCode: 55,
		areaCode: 44,
		number: 30303030,
		email: "luke@test.com"
	},
	"Luke");
});

test("Create contact", async () => {
	const response = await ContactSupport.createContact({
		contactType: "Work",
		countryCode: 55,
		areaCode: 44,
		number: 30323032,
		email: "luke@test.com"
	},
	"Luke");

	expect(response.status).toBe(200);
	expect(response.body.contactType).toBe("Work");
	expect(response.body.countryCode).toBe(55);
	expect(response.body.areaCode).toBe(44);
	expect(response.body.number).toBe(30323032);
	expect(response.body.email).toBe("luke@test.com");
});

test("Return all contacts from person", async () => {
	const response = await ContactSupport.getContactsFromPerson("Luke");

	expect(response.status).toBe(200);
	expect(response.body.name).toBe("Luke")
	expect(response.body.personContacts).toHaveLength(1);
	expect(response.body.personContacts[0].contactType).toBe("Private");
	expect(response.body.personContacts[0].countryCode).toBe(55);
	expect(response.body.personContacts[0].areaCode).toBe(44);
	expect(response.body.personContacts[0].number).toBe(30303030);
	expect(response.body.personContacts[0].email).toBe("luke@test.com");
});

test("Create contact without email", async () => {
	const response = await ContactSupport.createContact({
		contactType: "Work",
		countryCode: 55,
		areaCode: 44,
		number: 30323032
	},
	"Luke");

	expect(response.status).toBe(200);
	expect(response.body.contactType).toBe("Work");
	expect(response.body.countryCode).toBe(55);
	expect(response.body.areaCode).toBe(44);
	expect(response.body.number).toBe(30323032);
	expect(response.body.email).toBe(undefined);
});

test("It does not create contact without contact type", async () => {
	const response = await ContactSupport.createContact({
		countryCode: 55,
		areaCode: 44,
		number: 30323032,
		email: "luke@test.com"
	},
	"Luke");

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(1);
	expect(response.body.errors[0]).toBe("Field 'Contact Type' must be filled");
});

test("It does not create contact without country code", async () => {
	const response = await ContactSupport.createContact({
		contactType: "Work",
		areaCode: 44,
		number: 30323032,
		email: "luke@test.com"
	},
	"Luke");

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(2);
	expect(response.body.errors[0]).toBe("Field 'Country Code' must be filled");
	expect(response.body.errors[1]).toBe("'Country Code' must contain only numbers");
});

test("It does not create contact without area code", async () => {
	const response = await ContactSupport.createContact({
		contactType: "Work",
		countryCode: 55,
		number: 30323032,
		email: "luke@test.com"
	},
	"Luke");

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(2);
	expect(response.body.errors[0]).toBe("Field 'Area Code' must be filled");
	expect(response.body.errors[1]).toBe("'Area Code' must contain only numbers");
});

test("It does not create contact without number", async () => {
	const response = await ContactSupport.createContact({
		contactType: "Work",
		countryCode: 55,
		areaCode: 44,
		email: "luke@test.com"
	},
	"Luke");

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(2);
	expect(response.body.errors[0]).toBe("Field 'Number' must be filled");
	expect(response.body.errors[1]).toBe("'Number' must contain only numbers");
});

test("It does not create contact without person", async () => {
	const response = await ContactSupport.createContact({
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
	const response = await ContactSupport.createContact({
		contactType: "Work",
		countryCode: 55,
		areaCode: 44,
		number: 30323032,
		email: "@"
	},
	"Luke");

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(1);
	expect(response.body.errors[0]).toBe("Invalid 'E-mail'");
});