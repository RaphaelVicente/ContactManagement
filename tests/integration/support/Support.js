const request = require("supertest");
const api = require("../../../src/api");

class Support {
	constructor() {
		this.token;
	}

	async authenticateEmployee() {
		const resp = await request(api).post("/unau/auth")
			.send({ username: "admin", password: "admin" });

		this.token = JSON.stringify(resp.body.token);
		return this.token;
	}
}

module.exports = Support;