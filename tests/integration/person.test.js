const CityCreated = require("./environment/CityCreated");
const PersonSupport = require("./support/PersonSupport");

beforeEach(async () => {
	await CityCreated.start();
	await PersonSupport.authenticateEmployee();
	await PersonSupport.createFivePeople();
});

test("Create person", async () => {
	const response = await PersonSupport.createPerson({
		name: "Lucasfilm",
		birthDate: "1971-01-01",
		type: "Legal"
	});

	expect(response.status).toBe(200);
	expect(response.body.name).toBe("Lucasfilm");
	expect(response.body.birthDate).toBe("1971-01-01");
	expect(response.body.type).toBe("Legal");
});

test("Return people by name", async () => {
	const response = await PersonSupport.getPeopleByName("Luke");

	expect(response.status).toBe(200);
	expect(response.body).toHaveLength(1);
	expect(response.body[0].name).toBe("Luke");
	expect(response.body[0].birthDate).toBe("1977-11-18");
	expect(response.body[0].type).toBe("Individual");
});

test("Return all people", async () => {
	const response = await PersonSupport.getPeople();

	expect(response.status).toBe(200);
	expect(response.body).toHaveLength(6);
	expect(response.body[0].name).toBe("Admin");
	expect(response.body[1].name).toBe("John");
	expect(response.body[2].name).toBe("Lara");
	expect(response.body[3].name).toBe("Luke");
	expect(response.body[4].name).toBe("Michael");
	expect(response.body[5].name).toBe("Smith");
});

test("It does not create person without name", async () => {
	const response = await PersonSupport.createPerson({
		birthDate: "1977-11-18",
		type: "Individual"
	});

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(1);
	expect(response.body.errors[0]).toBe("Field 'Name' must be filled");
});

test("It does not create person with invalid name", async () => {
	const response = await PersonSupport.createPerson({
		name: "Luke 2",
		birthDate: "1977-11-18",
		type: "Individual"
	});

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(1);
	expect(response.body.errors[0]).toBe("Invalid 'Name'");
});

test("It does not create person without birth date", async () => {
	const response = await PersonSupport.createPerson({
		name: "Luke",
		type: "Individual"
	});

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(2);
	expect(response.body.errors[0]).toBe("Field 'Birth Date' must be filled");
	expect(response.body.errors[1]).toBe("Invalid 'Birth Date'");
});

test("It does not create person with invalid birth date", async () => {
	const response = await PersonSupport.createPerson({
		name: "Luke",
		birthDate: "1977-18-11",
		type: "Individual"
	});

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(1);
	expect(response.body.errors[0]).toBe("Invalid 'Birth Date'");
});

test("It does not create person without type", async () => {
	const response = await PersonSupport.createPerson({
		name: "Luke",
		birthDate: "1977-11-18"
	});

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(1);
	expect(response.body.errors[0]).toBe("Field 'Type' must be filled");
});

test("It does not find people without name", async () => {
	const response = await PersonSupport.getPeopleByName(null);

	expect(response.status).toBe(200);
	expect(response.body).toHaveLength(0);
});

test("It does not create person without any information", async () => {
	const response = await PersonSupport.createPerson({});

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(4);
	expect(response.body.errors[0]).toBe("Field 'Name' must be filled");
	expect(response.body.errors[1]).toBe("Field 'Birth Date' must be filled");
	expect(response.body.errors[2]).toBe("Invalid 'Birth Date'");
	expect(response.body.errors[3]).toBe("Field 'Type' must be filled");
});