const request = require("supertest");

const api = require("../../src/api");
const truncate = require("../utils/truncate");
const CountrySupport = require("../utils/CountrySupport");
const StateSupport = require("../utils/StateSupport");
const CitySupport = require("../utils/CitySupport");
const AddressSupport = require("../utils/AddressSupport");
const PersonSupport = require("../utils/PersonSupport");

beforeEach(async () => {
	await truncate();
	const country = await CountrySupport.createCountry();
	const state = await StateSupport.createState(country.body);
	const city = await CitySupport.createCity(state.body);
	const person = await PersonSupport.createPerson();
	await AddressSupport.createAddress(city.body, person.body);
});

test("Create address", async () => {
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

test("Return all addresses", async () => {
	const response = await request(api).get("/addresses").send();

	expect(response.status).toBe(200);
	expect(response.body.length).toBe(1);
	expect(response.body[0].street).toBe("Mandaguari");
});

test("Return all addresses from city", async () => {
	const maringa = (await CitySupport.findCityByName("Maringá")).body;
	const addressesMaringa = await request(api).get(`/city/${maringa.id}/addresses`).send();

	expect(addressesMaringa.status).toBe(200);
	expect(addressesMaringa.body.length).toBe(1);
	expect(addressesMaringa.body[0].street).toBe("Mandaguari");
});

test("Return all addresses from person", async () => {
	const person = (await PersonSupport.findPeopleByName("Test1")).body[0];
	const response = await request(api).get(`/person/${person.id}/addresses`).send();

	expect(response.status).toBe(200);
	expect(response.body[0].street).toBe("Mandaguari");
});