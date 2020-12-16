const request = require("supertest");

const api = require("../../src/api");
const truncate = require("../utils/truncate");
const PersonSupport = require("../utils/PersonSupport");
const EmployeeSupport = require("../utils/EmployeeSupport");

beforeEach(async () => {
	await truncate();
    await PersonSupport.createFivePeople();
    await EmployeeSupport.createThreeEmployee();
});

test("Create employee", async () => {
	const person = (await PersonSupport.findPeopleByName("Test4")).body[0];
	const Employee = await request(api).post("/employee").send({
		username: "username4",
		password: "password4",
		occupation: "occupation4",
		personId: person.id
	});

	expect(Employee.status).toBe(200);
	expect(Employee.body.username).toBe("username4");
});

test("Create person and employee", async () => {
	const personEmployee = await request(api).post("/employee").send({
		name: "Test11",
		birthDate: "1989-01-15",
		type: "Individual",
		personEmployee: {
			username: "username11",
			password: "password11",
			occupation: "occupation11"
		}
	});

	expect(personEmployee.status).toBe(200);
	expect(personEmployee.body.personEmployee.username).toBe("username11");
});

test("Does not create employee with username already regitered", async () => {
    const person = (await PersonSupport.findPeopleByName("Test5")).body[0];
	const employee = await request(api).post("/employee").send({
		username: "username3",
		password: "password4",
		occupation: "occupation4",
		personId: person.id
	});

	expect(employee.status).toBe(500);
	expect(employee.body.error).toBe("Username username3 already registered.");

	const personEmployee = await request(api).post("/employee").send({
		name: "Test11",
		birthDate: "1989-01-15",
		type: "Individual",
		personEmployee: {
			username: "username2",
			password: "password7",
			occupation: "occupation7"
		}
	});

	expect(personEmployee.status).toBe(500);
	expect(personEmployee.body.error).toBe("Username username2 already registered.");
});

test("Return all employee", async () => {
	const response = await request(api).get("/employees").send();

	expect(response.status).toBe(200);
	expect(response.body.length).toBe(3);
});

test("Return a employee", async () => {
	const response = await request(api).get("/employee/username3").send();

	expect(response.status).toBe(200);
	expect(response.body.personEmployee.name).toBe("Test4");
	expect(response.body.username).toBe("username3");
	expect(response.body.occupation).toBe("occupation3");
});