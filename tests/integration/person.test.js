const request = require("supertest");

const api = require("../../src/api");
const truncate = require("../utils/truncate");
const PersonSupport = require("../utils/PersonSupport");

beforeEach(async () => {
	await truncate();
	await PersonSupport.createFivePeople();
	await PersonSupport.createThreeEmployee();
});

test("Create person", async () => {
	const response = await request(api).post("/person").send({
		name: "Test11",
		birthDate: "1989-11-07",
		type: "Legal"
	});

	expect(response.status).toBe(200);
	expect(response.body.name).toBe("Test11");
});

test("Create employee", async () => {
	const personEmployee = await request(api).post("/employee").send({
		name: "Test11",
		birthDate: "1989-01-15",
		type: "Individual",
		personEmployee: {
			username: "username6",
			password: "password6",
			occupation: "occupation6"
		}
	});

	expect(personEmployee.status).toBe(200);
	expect(personEmployee.body.personEmployee.username).toBe("username6");
});

test("Return all people", async () => {
	const response = await request(api).get("/people").send();

	expect(response.status).toBe(200);
	expect(response.body.length).toBe(14);
});

test("Does not create employee with username already regitered", async () => {
	const person = (await PersonSupport.findPeopleByName("Test6")).body[0];
	const employee = await request(api).post("/employee").send({
		username: "username7",
		password: "password7",
		occupation: "occupation7",
		personId: person.id
	});

	expect(employee.status).toBe(500);
	expect(employee.body.error).toBe("Username username7 already registered.");

	const personEmployee = await request(api).post("/employee").send({
		name: "Test11",
		birthDate: "1989-01-15",
		type: "Individual",
		personEmployee: {
			username: "username7",
			password: "password7",
			occupation: "occupation7"
		}
	});

	expect(personEmployee.status).toBe(500);
	expect(personEmployee.body.error).toBe("Username username7 already registered.");
});

test("Return all employee", async () => {
	const response = await request(api).get("/employee").send();

	expect(response.status).toBe(200);
	expect(response.body.length).toBe(3);
});