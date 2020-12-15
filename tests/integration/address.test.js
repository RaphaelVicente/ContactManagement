const request = require("supertest");

const api = require("../../src/api");
const truncate = require("../utils/truncate");
const CountrySupport = require("../utils/CountrySupport");
const StateSupport = require("../utils/StateSupport");
const CitySupport = require("../utils/CitySupport");
const PersonSupport = require("../utils/PersonSupport");

beforeEach(async () => {
	const res = await truncate();
	const countries = await CountrySupport.createFiveCountries();
	const states = await StateSupport.createFiveStates(countries[0].body);
	const cities = await CitySupport.createFiveCities(states[0].body);
	const person = await PersonSupport.createPerson();
	await request(api).post("/address").send({
		neighborhood: "Zona 7",
		zipcode: "87030025",
		street: "Mandaguari",
		number: 2100,
		complement: "Ap 207",
		cityId: cities[0].id,
		personId: person.id
	});
});

it("Create address", async () => {
	const city = (await CitySupport.findCityByName("Maringá")).body;
	const person = (await PersonSupport.findPeopleByName("Test1")).body[0];
	const response = await request(api).post("/address").send({
		neighborhood: "Centro",
		zipcode: "87030025",
		street: "Horacio",
		number: 5355,
		complement: "Sala 1",
		cityId: city.id,
		personId: person.id
	});

	expect(response.status).toBe(200);
	expect(response.body.street).toBe("Horacio");
});

it("Return all addresses", async () => {
	const response = await request(api).get("/addresses").send();

	expect(response.status).toBe(200);
	expect(response.body.length).toBe(1);
	expect(response.body[0].street).toBe("Mandaguari");
});

it("Return all addresses from city", async () => {
	const maringa = (await CitySupport.findCityByName("Maringá")).body;
	const addressesMaringa = await request(api).get(`/city/${maringa.id}/addresses`).send();

	const pinhais = (await CitySupport.findCityByName("Pinhais")).body;
	const addressesPinhais = await request(api).get(`/city/${pinhais.id}/addresses`).send();

	expect(addressesMaringa.status).toBe(200);
	expect(addressesMaringa.body.length).toBe(1);
	expect(addressesMaringa.body[0].street).toBe("Mandaguari");

	expect(addressesPinhais.status).toBe(200);
	expect(addressesPinhais.body.length).toBe(0);
});

it("Return all addresses from person", async () => {
	const person = (await PersonSupport.findPeopleByName("Test1")).body[0];
	const response = await request(api).get(`/person/${person.id}/addresses`).send();

	expect(response.status).toBe(200);
	expect(response.body[0].street).toBe("Mandaguari");
});