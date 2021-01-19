const request = require("supertest");

const api = require("../../src/api");
const truncate = require("./support/truncate");
const PersonSupport = require("./support/PersonSupport");
const EmployeeSupport = require("./support/EmployeeSupport");

let token;

beforeEach(async () => {
	await truncate();
	await EmployeeSupport.createStarterPerson();
	const resp = await EmployeeSupport.authenticateEmployee();
	token = JSON.stringify(resp.body.token);
		
	await PersonSupport.createFivePeople(token);
    await EmployeeSupport.createThreeEmployees(token);
});

test("Create employee", async () => {
	const person = (await PersonSupport.findPeopleByName("Smith", token)).body[0];
	const employee = await request(api).post("/au/employee").set('Authorization', token).send({
		username: "UsernameSmith",
		password: "passwordsmith",
		occupation: "salesman",
		isAdmin: false,
		personId: person.id
	});

	expect(employee.status).toBe(200);
	expect(employee.body.username).toBe("UsernameSmith");
});

test("Create person and employee", async () => {
	const personEmployee = await request(api).post("/au/employee").set('Authorization', token).send({
		name: "Jane",
		birthDate: "1989-01-15",
		type: "Individual",
		personEmployee: {
			username: "UsernameJane",
			password: "passwordjane",
			occupation: "cashier",
			isAdmin: false
		}
	});

	expect(personEmployee.status).toBe(200);
	expect(personEmployee.body.personEmployee.username).toBe("UsernameJane");
});

test("Return all employees", async () => {
	const response = await request(api).get("/au/employees").set('Authorization', token).send();
	
	expect(response.status).toBe(200);
	expect(response.body).toHaveLength(4);
	expect(response.body[0].personEmployee.username).toBe("admin")
	expect(response.body[1].personEmployee.username).toBe("UsernameJohn")
	expect(response.body[2].personEmployee.username).toBe("UsernameLara")
	expect(response.body[3].personEmployee.username).toBe("UsernameLuke")
});

test("Return a employee", async () => {
	const response = await request(api).get("/au/employee/UsernameLuke").set('Authorization', token).send();

	expect(response.status).toBe(200);
	expect(response.body.personEmployee.name).toBe("Luke");
	expect(response.body.username).toBe("UsernameLuke");
	expect(response.body.occupation).toBe("salesman");
});

test("It does not create employee without username", async () => {
	const person = (await PersonSupport.findPeopleByName("Smith", token)).body[0];
	const Employee = await request(api).post("/au/employee").set('Authorization', token).send({
		password: "passwordsmith",
		occupation: "salesman",
		isAdmin: false,
		personId: person.id
	});

	expect(Employee.status).toBe(500);
	expect(Employee.body.errors).toHaveLength(1);
	expect(Employee.body.errors[0]).toBe("Field 'Username' must be filled");
});

test("It does not create employee with username already regitered", async () => {
    const person = (await PersonSupport.findPeopleByName("Smith", token)).body[0];
	const employee = await request(api).post("/au/employee").set('Authorization', token).send({
		username: "UsernameLuke",
		password: "passwordsmith",
		occupation: "salesman",
		isAdmin: false,
		personId: person.id
	});

	expect(employee.status).toBe(500);
	expect(employee.body.errors[0]).toBe("Username UsernameLuke already registered.");

	const personEmployee = await request(api).post("/au/employee").set('Authorization', token).send({
		name: "Jane",
		birthDate: "1989-01-15",
		type: "Individual",
		personEmployee: {
			username: "UsernameLara",
			password: "passwordjane",
			occupation: "cashier",
			isAdmin: false
		}
	});

	expect(personEmployee.status).toBe(500);
	expect(personEmployee.body.errors[0]).toBe("Username UsernameLara already registered.");
});

test("It does not create employee for person who does not exists", async () => {
	const Employee = await request(api).post("/au/employee").set('Authorization', token).send({
		username: "newusername",
		password: "passwordsmith",
		occupation: "salesman",
		isAdmin: false,
		personId: -1
	});

	expect(Employee.status).toBe(500);
	expect(Employee.body.errors).toHaveLength(1);
	expect(Employee.body.errors[0]).toBe("Does not exists a person with id -1.");
});

test("It does not create employee for person when person has already been an employee", async () => {
	const person = (await PersonSupport.findPeopleByName("Luke", token)).body[0];
	const Employee = await request(api).post("/au/employee").set('Authorization', token).send({
		username: "newusername",
		password: "passwordsmith",
		occupation: "salesman",
		isAdmin: false,
		personId: person.id
	});

	expect(Employee.status).toBe(500);
	expect(Employee.body.errors).toHaveLength(1);
	expect(Employee.body.errors[0]).toBe("Person Luke has already been an Employee.");
});

test("It does not create employee without password", async () => {
	const person = (await PersonSupport.findPeopleByName("Smith", token)).body[0];
	const Employee = await request(api).post("/au/employee").set('Authorization', token).send({
		username: "UsernameSmith",
		occupation: "salesman",
		isAdmin: false,
		personId: person.id
	});

	expect(Employee.status).toBe(500);
	expect(Employee.body.errors).toHaveLength(1);
	expect(Employee.body.errors[0]).toBe("Field 'Password' must be filled");
});

test("It does not create employee without occupation", async () => {
	const person = (await PersonSupport.findPeopleByName("Smith", token)).body[0];
	const Employee = await request(api).post("/au/employee").set('Authorization', token).send({
		username: "UsernameSmith",
		password: "passwordsmith",
		isAdmin: false,
		personId: person.id
	});

	expect(Employee.status).toBe(500);
	expect(Employee.body.errors).toHaveLength(1);
	expect(Employee.body.errors[0]).toBe("Field 'Occupation' must be filled");
});

test("It does not create employee without is admin", async () => {
	const person = (await PersonSupport.findPeopleByName("Smith", token)).body[0];
	const Employee = await request(api).post("/au/employee").set('Authorization', token).send({
		username: "UsernameSmith",
		password: "passwordsmith",
		occupation: "salesman",
		personId: person.id
	});

	expect(Employee.status).toBe(500);
	expect(Employee.body.errors).toHaveLength(1);
	expect(Employee.body.errors[0]).toBe("Field 'Is Admin' must be filled");
});

test("It does not create employee without any information", async () => {
	const person = (await PersonSupport.findPeopleByName("Smith", token)).body[0];
	const Employee = await request(api).post("/au/employee").set('Authorization', token).send({});

	expect(Employee.status).toBe(500);
	expect(Employee.body.errors).toHaveLength(5);
	expect(Employee.body.errors[0]).toBe("Field 'Username' must be filled");
	expect(Employee.body.errors[1]).toBe("Field 'Password' must be filled");
	expect(Employee.body.errors[2]).toBe("Field 'Occupation' must be filled");
	expect(Employee.body.errors[3]).toBe("Field 'Is Admin' must be filled");
	expect(Employee.body.errors[4]).toBe("Field 'Person Id' must be filled");
});