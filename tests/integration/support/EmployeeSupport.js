const request = require("supertest");
const api = require("../../../src/api");
const Support = require("./Support");

class EmployeeSupport extends Support {
	async createEmployee(employee, personName) {
		if (personName) {
			const resp = await request(api).get(`/au/people/${personName}`).set("Authorization", this.token).send();
			const person = resp.body[0];

			if (person)
				employee.personId = person.id;
		}

		return await request(api).post("/au/employee").set("Authorization", this.token).send(employee);
	}

	async createThreeEmployees() {
		const response = await request(api).get("/au/people").set("Authorization", this.token).send();
		const people = response.body;
		let employees = [];
		let entries = [
			{ username: "UsernameJohn", password: "passwordjohn", occupation: "salesman", isAdmin: false, personId: people[1].id },
			{ username: "UsernameLara", password: "passwordlara", occupation: "manager", isAdmin: false, personId: people[2].id },
			{ username: "UsernameLuke", password: "passwordluke", occupation: "salesman", isAdmin: false, personId: people[3].id }
		];

		for (let employee of entries)
			employees.push(await request(api).post("/au/employee").set("Authorization", this.token).send(employee));

		return employees;
	}

	async getAllEmployees() {
		return await request(api).get("/au/employees").set("Authorization", this.token).send();
	}

	async getEmployeeByUsername(username) {
		return await request(api).get(`/au/employee/${username}`).set("Authorization", this.token).send();
	}

	async authEmployee(employee) {
		return await request(api).post("/unau/auth").send(employee);
	}

	async validateToken(changeToken) {
		const newToken = changeToken ? JSON.parse(this.token) + "inv" : JSON.parse(this.token);
		return await request(api).post("/unau/validateToken").send({ token: newToken });
	}
}

module.exports = new EmployeeSupport();