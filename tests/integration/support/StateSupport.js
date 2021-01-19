const request = require("supertest");
const api = require("../../../src/api");
const Support = require("./Support");

class StateSupport extends Support {
	async createState(state) {
		return await request(api).post('/au/state').set('Authorization', this.token).send(state);
	}
	
	async createParana(country) {
		return await this.createState({ name: "Parana", abbreviation: "PR", countryId: country.id });
	}

	async createFiveStates() {
		const resp = await request(api).get('/au/country/Brazil').set('Authorization', this.token).send();
		const country = resp.body;

		let states = [];
		let entries = [
			{ name: "Parana", abbreviation: "PR", countryId: country.id },
			{ name: "Sao Paulo", abbreviation: "SP", countryId: country.id },
			{ name: "Rio Grande do Sul", abbreviation: "RS", countryId: country.id },
			{ name: "Santa Catarina", abbreviation: "SC", countryId: country.id },
			{ name: "Minas Gerais", abbreviation: "MG", countryId: country.id }
		];

		for (let state of entries)
			states.push(await request(api).post('/au/state').set('Authorization', this.token).send(state));

		return states;
	}

	async getAllStates() {
		const resp = await request(api).get('/au/states').set('Authorization', this.token).send();
		return resp.body;
	}

	async getStateByName(name) {
		const resp = await request(api).get(`/au/state/${name}`).set('Authorization', this.token).send();
		return resp.body;
	}
}

module.exports = new StateSupport();