const request = require("supertest");
const Connection = require('../../../src/api/models/index');
const api = require("../../../src/api");

class EmployeeSupport {
	async createStarterPerson() {
		await Connection.queryInterface.bulkInsert('person', [
			{ name: "Admin", birth_date: "1989-01-01", type: "Individual", created_at: new Date(), updated_at: new Date() }
		]);

		const people = await Connection.queryInterface.sequelize.query('SELECT id from person');
		const person = people[0][0];

		await Connection.queryInterface.bulkInsert('employee', [
			{ username: "admin", password: "admin", occupation: "admin", is_admin: true, person_id: person.id, created_at: new Date(), updated_at: new Date() }
		]);
	}

	async authenticateEmployee() {
		return await request(api).post("/unau/auth")
			.send({ username: "admin", password: "admin" });
	}

	async createThreeEmployees(token) {
		const response = await request(api).get("/au/people").set('Authorization', token).send();
		const people = response.body;
		let employees = [];
		let entries = [
			{ username: "UsernameJohn", password: "passwordjohn", occupation: "salesman", isAdmin: false, personId: people[1].id },
			{ username: "UsernameLara", password: "passwordlara", occupation: "manager", isAdmin: false, personId: people[2].id },
			{ username: "UsernameLuke", password: "passwordluke", occupation: "salesman", isAdmin: false, personId: people[3].id }
		];

		for (let employee of entries)
			employees.push(await request(api).post("/au/employee").set('Authorization', token).send(employee));

		return employees;
	}
}

module.exports = new EmployeeSupport();