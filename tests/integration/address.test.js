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
	const city = (await CitySupport.findCityByName("Maringa")).body;
	const person = (await PersonSupport.findPeopleByName("Luke")).body[0];
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
	expect(response.body).toHaveLength(1);
	expect(response.body[0].street).toBe("Mandaguari");
});

test("Return all addresses from city", async () => {
	const maringa = (await CitySupport.findCityByName("Maringa")).body;
	const addressesMaringa = await request(api).get(`/city/${maringa.id}/addresses`).send();

	expect(addressesMaringa.status).toBe(200);
	expect(addressesMaringa.body).toHaveLength(1);
	expect(addressesMaringa.body[0].street).toBe("Mandaguari");
});

test("Return all addresses from person", async () => {
	const person = (await PersonSupport.findPeopleByName("Luke")).body[0];
	const response = await request(api).get(`/person/${person.id}/addresses`).send();

	expect(response.status).toBe(200);
	expect(response.body).toHaveLength(1);
	expect(response.body[0].street).toBe("Mandaguari");
});

test("It does not create address without neighborhood", async () => {
	const city = (await CitySupport.findCityByName("Maringa")).body;
	const person = (await PersonSupport.findPeopleByName("Luke")).body[0];
	const response = await request(api).post("/address").send({
		zipcode: "87030025",
		street: "Horacio",
		number: 5355,
		complement: "Sala 1",
		cityId: city.id,
		personId: person.id
	});

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(1);
	expect(response.body.errors[0]).toBe("Field 'Neighborhood' must be filled");
});

test("It does not create address without zipcode", async () => {
	const city = (await CitySupport.findCityByName("Maringa")).body;
	const person = (await PersonSupport.findPeopleByName("Luke")).body[0];
	const response = await request(api).post("/address").send({
		neighborhood: "Centro",
		street: "Horacio",
		number: 5355,
		complement: "Sala 1",
		cityId: city.id,
		personId: person.id
	});

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(1);
	expect(response.body.errors[0]).toBe("Field 'Zipcode' must be filled");
});

test("It does not create address without number", async () => {
	const city = (await CitySupport.findCityByName("Maringa")).body;
	const person = (await PersonSupport.findPeopleByName("Luke")).body[0];
	const response = await request(api).post("/address").send({
		neighborhood: "Centro",
		zipcode: "87030025",
		street: "Horacio",
		complement: "Sala 1",
		cityId: city.id,
		personId: person.id
	});

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(2);
	expect(response.body.errors[0]).toBe("Field 'Number' must be filled");
	expect(response.body.errors[1]).toBe("'Number' must contain only numbers");
});

test("It does not create address with invalid number", async () => {
	const city = (await CitySupport.findCityByName("Maringa")).body;
	const person = (await PersonSupport.findPeopleByName("Luke")).body[0];
	const response = await request(api).post("/address").send({
		neighborhood: "Centro",
		zipcode: "87030025",
		street: "Horacio",
		number: "5355A",
		complement: "Sala 1",
		cityId: city.id,
		personId: person.id
	});

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(1);
	expect(response.body.errors[0]).toBe("'Number' must contain only numbers");
});

test("It does not create address without street", async () => {
	const city = (await CitySupport.findCityByName("Maringa")).body;
	const person = (await PersonSupport.findPeopleByName("Luke")).body[0];
	const response = await request(api).post("/address").send({
		neighborhood: "Centro",
		zipcode: "87030025",
		number: 5355,
		complement: "Sala 1",
		cityId: city.id,
		personId: person.id
	});

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(1);
	expect(response.body.errors[0]).toBe("Field 'Street' must be filled");
});

test("It does not create address without city", async () => {
	const person = (await PersonSupport.findPeopleByName("Luke")).body[0];
	const response = await request(api).post("/address").send({
		neighborhood: "Centro",
		zipcode: "87030025",
		street: "Horacio",
		number: 5355,
		complement: "Sala 1",
		personId: person.id
	});

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(1);
	expect(response.body.errors[0]).toBe("Field 'City Id' must be filled");
});

test("It does not create address without person", async () => {
	const city = (await CitySupport.findCityByName("Maringa")).body;
	const response = await request(api).post("/address").send({
		neighborhood: "Centro",
		zipcode: "87030025",
		street: "Horacio",
		number: 5355,
		complement: "Sala 1",
		cityId: city.id
	});

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(1);
	expect(response.body.errors[0]).toBe("Field 'Person Id' must be filled");
});

test("It does not create address without information", async () => {
	const city = (await CitySupport.findCityByName("Maringa")).body;
	const response = await request(api).post("/address").send({});

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(7);
	expect(response.body.errors[0]).toBe("Field 'Neighborhood' must be filled");
	expect(response.body.errors[1]).toBe("Field 'Zipcode' must be filled");
	expect(response.body.errors[2]).toBe("Field 'Street' must be filled");
	expect(response.body.errors[3]).toBe("Field 'Number' must be filled");
	expect(response.body.errors[4]).toBe("'Number' must contain only numbers");
	expect(response.body.errors[5]).toBe("Field 'City Id' must be filled");
	expect(response.body.errors[6]).toBe("Field 'Person Id' must be filled");
});