const request = require("supertest");
const api = require("../../src/api");

class CountrySupport {
	async createCountry() {
		return await request(api).post('/country').send({ name: "Brasil", countryCode: 55 });
	}

	async createFiveCountries() {
		let countries = [];
		let entries = [
			{ name: "Brasil", countryCode: 55 },
			{ name: "Estados Unidos", countryCode: 1 },
			{ name: "Inglaterra", countryCode: 44 },
			{ name: "Irlanda", countryCode: 353 },
			{ name: "Alemanha", countryCode: 49 }
		];

		for (let country of entries)
			countries.push(await request(api).post('/country').send(country));

		return countries;
	}

	async findAllCountries() {
		return await request(api).get('/countries').send();
	}

	async findCountryByName(name) {
		return await request(api).get(`/country/${name}`).send();
	}
}

module.exports = new CountrySupport();