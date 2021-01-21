const request = require("supertest");
const api = require("../../../src/api");
const Support = require("./Support");

class CountrySupport extends Support {
	constructor() {
		super();
	}

	async createCountry(country) {
		return await request(api).post("/au/country").set("Authorization", this.token).send(country);
	}

	async createBrazil() {
		return await this.createCountry({ name: "Brazil", countryCode: 55 });
	}

	async createFiveCountries() {
		let countries = [];
		let entries = [
			{ name: "Brazil", countryCode: 55 },
			{ name: "United States", countryCode: 1 },
			{ name: "England", countryCode: 44 },
			{ name: "Ireland", countryCode: 353 },
			{ name: "Germany", countryCode: 49 }
		];

		for (let country of entries)
			countries.push(await request(api).post("/au/country").set("Authorization", this.token).send(country));

		return countries;
	}

	async getAllCountries() {
		return await request(api).get("/au/countries").set("Authorization", this.token).send();
	}

	async getCountryByName(name) {
		return await request(api).get(`/au/country/${name}`).set("Authorization", this.token).send();
	}
}

module.exports = new CountrySupport();