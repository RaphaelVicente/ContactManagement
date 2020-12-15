const request = require("supertest");
const api = require("../../src/api");

class StateSupport {
	async createFiveStates(country) {
		let states = [];
		let entries = [
			{ name: "Paraná", abbreviation: "PR", countryId: country.id },
			{ name: "São Paulo", abbreviation: "SP", countryId: country.id },
			{ name: "Rio Grande do Sul", abbreviation: "RS", countryId: country.id },
			{ name: "Santa Catarina", abbreviation: "SC", countryId: country.id },
			{ name: "Minas Gerais", abbreviation: "MG", countryId: country.id }
		];

		for (let state of entries)
			states.push(await request(api).post('/state').send(state));

		return states;
	}

	async findAllStates() {
		return await request(api).get('/states').send();
	}

	async findStateByName(name) {
		return await request(api).get(`/state/${name}`).send();
	}
}

module.exports = new StateSupport();