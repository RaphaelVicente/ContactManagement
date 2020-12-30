const request = require("supertest");

const api = require("../../src/api");
const truncate = require("../utils/truncate");
const CountrySupport = require("../utils/CountrySupport");
const StateSupport = require("../utils/StateSupport");

beforeEach(async () => {
	await truncate();
	const resps = await CountrySupport.createFiveCountries();
	await StateSupport.createFiveStates(resps[0].body);
});

test("Create state", async () => {
	const resp = await CountrySupport.findCountryByName("Brazil");
	const response = await request(api).post("/state").send({ name: "Mato Grosso", abbreviation: "MT", countryId: resp.body.id })

	expect(response.status).toBe(200);
	expect(response.body.name).toBe("Mato Grosso");
});

test("Return a state by name", async () => {
	const response = await request(api).get("/state/Parana").send();

	expect(response.status).toBe(200);
	expect(response.body.name).toBe("Parana");
	expect(response.body.abbreviation).toBe("PR");
});

test("Return all states", async () => {
	const response = await request(api).get("/states").send();

	expect(response.status).toBe(200);
	expect(response.body).toHaveLength(5);
	expect(response.body[0].name).toBe("Minas Gerais");
	expect(response.body[1].name).toBe("Parana");
	expect(response.body[2].name).toBe("Rio Grande do Sul");
	expect(response.body[3].name).toBe("Santa Catarina");
	expect(response.body[4].name).toBe("Sao Paulo");
});

test("Return all states from country", async () => {
	const brasil = (await CountrySupport.findCountryByName("Brazil")).body;
	const statesBrasil = await request(api).get(`/country/${brasil.id}/states`).send();

	const inglaterra = (await CountrySupport.findCountryByName("England")).body;
	const statesInglaterra = await request(api).get(`/country/${inglaterra.id}/states`).send();

	expect(statesBrasil.status).toBe(200);
	expect(statesBrasil.body).toHaveLength(5);
	expect(statesBrasil.body[0].name).toBe("Minas Gerais");
	expect(statesBrasil.body[1].name).toBe("Parana");
	expect(statesBrasil.body[2].name).toBe("Rio Grande do Sul");
	expect(statesBrasil.body[3].name).toBe("Santa Catarina");
	expect(statesBrasil.body[4].name).toBe("Sao Paulo");

	expect(statesInglaterra.status).toBe(200);
	expect(statesInglaterra.body).toHaveLength(0);
});

test("It does not create state without name", async () => {
	const resp = await CountrySupport.findCountryByName("Brazil");
	const response = await request(api).post("/state").send({ abbreviation: "MT", countryId: resp.body.id })

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(1);
	expect(response.body.errors[0]).toBe("Field 'Name' must be filled");
});

test("It does not create state with invalid name", async () => {
	const resp = await CountrySupport.findCountryByName("Brazil");
	const response = await request(api).post("/state").send({ name: "Mato Grosso2", abbreviation: "MT", countryId: resp.body.id })

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(1);
	expect(response.body.errors[0]).toBe("Invalid 'Name'");
});

test("It does not create state without abbreviation", async () => {
	const resp = await CountrySupport.findCountryByName("Brazil");
	const response = await request(api).post("/state").send({ name: "Mato Grosso", countryId: resp.body.id })

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(1);
	expect(response.body.errors[0]).toBe("Field 'Abbreviation' must be filled");
});

test("It does not create state with invalid abbreviation", async () => {
	const resp = await CountrySupport.findCountryByName("Brazil");
	const response = await request(api).post("/state").send({ name: "Mato Grosso", abbreviation: "MT2", countryId: resp.body.id })

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(1);
	expect(response.body.errors[0]).toBe("Invalid 'Abbreviation'");
});

test("It does not create state without country", async () => {
	const response = await request(api).post("/state").send({ name: "Mato Grosso", abbreviation: "MT" })

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(1);
	expect(response.body.errors[0]).toBe("Field 'Country Id' must be filled");
});