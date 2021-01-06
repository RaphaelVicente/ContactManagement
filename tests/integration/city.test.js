const request = require("supertest");

const api = require("../../src/api");
const truncate = require("../utils/truncate");
const CountrySupport = require("../utils/CountrySupport");
const StateSupport = require("../utils/StateSupport");
const CitySupport = require("../utils/CitySupport");

beforeEach(async () => {
	await truncate();
	const countries = await CountrySupport.createFiveCountries();
	const states = await StateSupport.createFiveStates(countries[0].body);
	await CitySupport.createFiveCities(states[0].body);
});

test("Create city", async () => {
	const state = (await StateSupport.findStateByName("Sao Paulo")).body;
	const response = await request(api).post("/city").send({ name: "Tupa", areaCode: 14, stateId: state.id });

	expect(response.status).toBe(200);
	expect(response.body.name).toBe("Tupa");
});

test("Return a city by name", async () => {
	const response = await request(api).get("/city/Pinhais").send();

	expect(response.status).toBe(200);
	expect(response.body.name).toBe("Pinhais");
	expect(response.body.areaCode).toBe(41);
});

test("Return all cities", async () => {
	const response = await request(api).get("/cities").send();

	expect(response.status).toBe(200);
	expect(response.body).toHaveLength(5);
	expect(response.body[0].name).toBe("Maringa");
	expect(response.body[1].name).toBe("Paranagua");
	expect(response.body[2].name).toBe("Pinhais");
	expect(response.body[3].name).toBe("Ponta Grossa");
	expect(response.body[4].name).toBe("Toledo");
});

test("Return all cities from state", async () => {
	const parana = (await StateSupport.findStateByName("Parana")).body;
	const citiesParana = await request(api).get(`/state/${parana.id}/cities`).send();

	const saoPaulo = (await StateSupport.findStateByName("Sao Paulo")).body;
	const citiesSaoPaulo = await request(api).get(`/state/${saoPaulo.id}/cities`).send();

	expect(citiesParana.status).toBe(200);
	expect(citiesParana.body).toHaveLength(5);
	expect(citiesParana.body[0].name).toBe("Maringa");
	expect(citiesParana.body[1].name).toBe("Paranagua");
	expect(citiesParana.body[2].name).toBe("Pinhais");
	expect(citiesParana.body[3].name).toBe("Ponta Grossa");
	expect(citiesParana.body[4].name).toBe("Toledo");

	expect(citiesSaoPaulo.status).toBe(200);
	expect(citiesSaoPaulo.body).toHaveLength(0);
});

test("It does not create city without name", async () => {
	const state = (await StateSupport.findStateByName("Sao Paulo")).body;
	const response = await request(api).post("/city").send({ areaCode: 14, stateId: state.id });

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(1);
	expect(response.body.errors[0]).toBe("Field 'Name' must be filled");
});

test("It does not create city with invalid name", async () => {
	const state = (await StateSupport.findStateByName("Sao Paulo")).body;
	const response = await request(api).post("/city").send({ name: "Tupa1", areaCode: 14, stateId: state.id });

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(1);
	expect(response.body.errors[0]).toBe("Invalid 'Name'");
});

test("It does not create city without area code", async () => {
	const state = (await StateSupport.findStateByName("Sao Paulo")).body;
	const response = await request(api).post("/city").send({ name: "Tupa", stateId: state.id });

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(2);
	expect(response.body.errors[0]).toBe("Field 'Area Code' must be filled");
	expect(response.body.errors[1]).toBe("'Area Code' must contain only numbers");
});

test("It does not create city with invalid area code", async () => {
	const state = (await StateSupport.findStateByName("Sao Paulo")).body;
	const response = await request(api).post("/city").send({ name: "Tupa", areaCode: "14a", stateId: state.id });

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(1);
	expect(response.body.errors[0]).toBe("'Area Code' must contain only numbers");
});

test("It does not create city without state", async () => {
	const response = await request(api).post("/city").send({ name: "Tupa", areaCode: 14 });

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(1);
	expect(response.body.errors[0]).toBe("Field 'State Id' must be filled");
});

test("It does not create city without any information", async () => {
	const response = await request(api).post("/city").send({});

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(4);
	expect(response.body.errors[0]).toBe("Field 'Name' must be filled");
	expect(response.body.errors[1]).toBe("Field 'Area Code' must be filled");
	expect(response.body.errors[2]).toBe("'Area Code' must contain only numbers");
	expect(response.body.errors[3]).toBe("Field 'State Id' must be filled");
});