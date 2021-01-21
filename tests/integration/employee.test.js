const PersonCreated = require("./environment/PersonCreated");
const EmployeeSupport = require("./support/EmployeeSupport");

beforeEach(async () => {
	await PersonCreated.start();
	await EmployeeSupport.authenticateEmployee();
    await EmployeeSupport.createThreeEmployees();
});

test("Create employee", async () => {
	const employee = await EmployeeSupport.createEmployee({
		username: "UsernameSmith",
		password: "passwordsmith",
		occupation: "salesman",
		isAdmin: false
	},
	"Smith");

	expect(employee.status).toBe(200);
	expect(employee.body.username).toBe("UsernameSmith");
	expect(employee.body.occupation).toBe("salesman");
	expect(employee.body.isAdmin).toBe(false);
});

test("Create person and employee", async () => {
	const personEmployee = await EmployeeSupport.createEmployee({
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
	const response = await EmployeeSupport.getAllEmployees();
	
	expect(response.status).toBe(200);
	expect(response.body).toHaveLength(4);
	expect(response.body[0].personEmployee.username).toBe("admin");
	expect(response.body[1].personEmployee.username).toBe("UsernameJohn");
	expect(response.body[2].personEmployee.username).toBe("UsernameLara");
	expect(response.body[3].personEmployee.username).toBe("UsernameLuke");
});

test("Return a employee", async () => {
	const response = await EmployeeSupport.getEmployeeByUsername("UsernameLuke");

	expect(response.status).toBe(200);
	expect(response.body.personEmployee.name).toBe("Luke");
	expect(response.body.username).toBe("UsernameLuke");
	expect(response.body.occupation).toBe("salesman");
});

test("It does not create employee without username", async () => {
	const employee = await EmployeeSupport.createEmployee({
		password: "passwordsmith",
		occupation: "salesman",
		isAdmin: false
	},
	"Smith");

	expect(employee.status).toBe(500);
	expect(employee.body.errors).toHaveLength(1);
	expect(employee.body.errors[0]).toBe("Field 'Username' must be filled");
});

test("It does not create employee with username already regitered", async () => {
	const employee = await EmployeeSupport.createEmployee({
		username: "UsernameLuke",
		password: "passwordsmith",
		occupation: "salesman",
		isAdmin: false
	},
	"Smith");

	expect(employee.status).toBe(500);
	expect(employee.body.errors[0]).toBe("Username UsernameLuke already registered.");

	const personEmployee = await EmployeeSupport.createEmployee({
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
	const employee = await EmployeeSupport.createEmployee({
		username: "newusername",
		password: "passwordsmith",
		occupation: "salesman",
		isAdmin: false,
		personId: -1
	});

	expect(employee.status).toBe(500);
	expect(employee.body.errors).toHaveLength(1);
	expect(employee.body.errors[0]).toBe("Does not exists a person with id -1.");
});

test("It does not create employee for person when person has already been an employee", async () => {
	const employee = await EmployeeSupport.createEmployee({
		username: "newusername",
		password: "passwordsmith",
		occupation: "salesman",
		isAdmin: false
	},
	"Luke");

	expect(employee.status).toBe(500);
	expect(employee.body.errors).toHaveLength(1);
	expect(employee.body.errors[0]).toBe("Person Luke has already been an Employee.");
});

test("It does not create employee without password", async () => {
	const employee = await EmployeeSupport.createEmployee({
		username: "UsernameSmith",
		occupation: "salesman",
		isAdmin: false
	},
	"Smith");

	expect(employee.status).toBe(500);
	expect(employee.body.errors).toHaveLength(1);
	expect(employee.body.errors[0]).toBe("Field 'Password' must be filled");
});

test("It does not create employee without occupation", async () => {
	const employee = await EmployeeSupport.createEmployee({
		username: "UsernameSmith",
		password: "passwordsmith",
		isAdmin: false
	},
	"Smith");

	expect(employee.status).toBe(500);
	expect(employee.body.errors).toHaveLength(1);
	expect(employee.body.errors[0]).toBe("Field 'Occupation' must be filled");
});

test("It does not create employee without is admin", async () => {
	const employee = await EmployeeSupport.createEmployee({
		username: "UsernameSmith",
		password: "passwordsmith",
		occupation: "salesman"
	},
	"Smith");

	expect(employee.status).toBe(500);
	expect(employee.body.errors).toHaveLength(1);
	expect(employee.body.errors[0]).toBe("Field 'Is Admin' must be filled");
});

test("It does not create employee without any information", async () => {
	const employee = await EmployeeSupport.createEmployee({});

	expect(employee.status).toBe(500);
	expect(employee.body.errors).toHaveLength(5);
	expect(employee.body.errors[0]).toBe("Field 'Username' must be filled");
	expect(employee.body.errors[1]).toBe("Field 'Password' must be filled");
	expect(employee.body.errors[2]).toBe("Field 'Occupation' must be filled");
	expect(employee.body.errors[3]).toBe("Field 'Is Admin' must be filled");
	expect(employee.body.errors[4]).toBe("Field 'Person Id' must be filled");
});

test("It does not authenticate employee with incorrect password", async () => {
	const employee = await EmployeeSupport.authEmployee({	
		username: "UsernameJohn",
		password: "password"
	});

	expect(employee.status).toBe(403);
	expect(employee.body.errors).toHaveLength(1);
	expect(employee.body.errors[0]).toBe("Incorrect username or password");
});