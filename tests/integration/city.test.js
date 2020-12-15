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
	const state = (await StateSupport.findStateByName("São Paulo")).body;
	const response = await request(api).post("/city").send({ name: "Tupã", areaCode: 14, stateId: state.id });

	expect(response.status).toBe(200);
	expect(response.body.name).toBe("Tupã");
});

test("Return all cities", async () => {
	const response = await request(api).get("/cities").send();

	expect(response.status).toBe(200);
	expect(response.body.length).toBe(5);
	expect(response.body[0].name).toBe("Maringá");
	expect(response.body[1].name).toBe("Paranaguá");
	expect(response.body[2].name).toBe("Pinhais");
	expect(response.body[3].name).toBe("Ponta Grossa");
	expect(response.body[4].name).toBe("Toledo");
});

test("Return all cities from state", async () => {
	const parana = (await StateSupport.findStateByName("Paraná")).body;
	const citiesParana = await request(api).get(`/state/${parana.id}/cities`).send();

	const saoPaulo = (await StateSupport.findStateByName("São Paulo")).body;
	const citiesSaoPaulo = await request(api).get(`/state/${saoPaulo.id}/cities`).send();

	expect(citiesParana.status).toBe(200);
	expect(citiesParana.body.length).toBe(5);
	expect(citiesParana.body[0].name).toBe("Maringá");
	expect(citiesParana.body[1].name).toBe("Paranaguá");
	expect(citiesParana.body[2].name).toBe("Pinhais");
	expect(citiesParana.body[3].name).toBe("Ponta Grossa");
	expect(citiesParana.body[4].name).toBe("Toledo");

	expect(citiesSaoPaulo.status).toBe(200);
	expect(citiesSaoPaulo.body.length).toBe(0);
});