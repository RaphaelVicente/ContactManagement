const request = require("supertest");
const api = require("../../../src/api");
const Support = require("./Support");

class CitySupport extends Support {
	async createCity(city, stateName) {
		const resp = await request(api).get(`/au/state/${stateName}`).set("Authorization", this.token).send();
		const state = resp.body;

		if (state)
			city.stateId = state.id;
		
		return await request(api).post("/au/city").set("Authorization", this.token).send(city);
	}
	
	async createFiveCities() {
		const resp = await request(api).get("/au/state/Parana").set("Authorization", this.token).send();
		const state = resp.body;

		let cities = [];
		let entries = [
			{ name: "Maringa", areaCode: 44, stateId: state.id },
			{ name: "Paranagua", areaCode: 41, stateId: state.id },
			{ name: "Toledo", areaCode: 45, stateId: state.id },
			{ name: "Ponta Grossa", areaCode: 42, stateId: state.id },
			{ name: "Pinhais", areaCode: 41, stateId: state.id }
		];

		for (let city of entries)
			cities.push(await request(api).post("/au/city").set("Authorization", this.token).send(city));

		return cities;
	}

	async getAllCities() {
		return await request(api).get("/au/cities").set("Authorization", this.token).send();
	}

	async getCityByName(name) {
		return await request(api).get(`/au/city/${name}`).set("Authorization", this.token).send();
	}

	async getCitiesFromState(stateName) {
		const resp = await request(api).get(`/au/state/${stateName}`).set("Authorization", this.token).send();
		const state = resp.body;
		return await request(api).get(`/au/state/${state.id}/cities`).set("Authorization", this.token).send();
	}
}

module.exports = new CitySupport();