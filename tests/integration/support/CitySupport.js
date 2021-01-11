const request = require("supertest");
const api = require("../../../src/api");

class CitySupport {
	async createCity(state) {
		return await request(api).post('/city').send({ name: "Maringa", areaCode: 44, stateId: state.id });
	}
	
	async createFiveCities(state) {
		let cities = [];
		let entries = [
			{ name: "Maringa", areaCode: 44, stateId: state.id },
			{ name: "Paranagua", areaCode: 41, stateId: state.id },
			{ name: "Toledo", areaCode: 45, stateId: state.id },
			{ name: "Ponta Grossa", areaCode: 42, stateId: state.id },
			{ name: "Pinhais", areaCode: 41, stateId: state.id }
		];

		for (let city of entries)
			cities.push(await request(api).post('/city').send(city));

		return cities;
	}

	async findAllCities() {
		return await request(api).get('/cities').send();
	}

	async findCityByName(name) {
		return await request(api).get(`/city/${name}`).send();
	}
}

module.exports = new CitySupport();