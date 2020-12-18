const request = require("supertest");

const api = require("../../src/api");
const truncate = require("../utils/truncate");
const CountrySupport = require("../utils/CountrySupport");

beforeEach(async () => {
	await truncate();
	await CountrySupport.createFiveCountries();
});

test("Create country", async () => {
	const response = await request(api).post("/country").send({ name: "Suiça", countryCode: 41 });

	expect(response.status).toBe(200);
	expect(response.body.name).toBe("Suiça");
});

test("Return all countries", async () => {
	const response = await request(api).get("/countries").send();

	expect(response.status).toBe(200);
	expect(response.body.length).toBe(5);
	expect(response.body[0].name).toBe("Alemanha");
	expect(response.body[1].name).toBe("Brasil");
	expect(response.body[2].name).toBe("Estados Unidos");
	expect(response.body[3].name).toBe("Inglaterra");
	expect(response.body[4].name).toBe("Irlanda");
});

test("Return a country by name", async () => {
	const response = await request(api).get("/country/Inglaterra").send();

	expect(response.status).toBe(200);
	expect(response.body.name).toBe("Inglaterra");
	expect(response.body.countryCode).toBe(44);
});

test("It does not create country without country code", async () => {
	const response = await request(api).post("/country").send({ name: "Suiça" });

	expect(response.status).toBe(500);
	expect(response.body.errors.length).toBe(1);
	expect(response.body.errors[0]).toBe("Field 'Country Code' must be filled");
});

test("It does not create country without name", async () => {
	const response = await request(api).post("/country").send({ countryCode: 41 });

	expect(response.status).toBe(500);
	expect(response.body.errors.length).toBe(1);
	expect(response.body.errors[0]).toBe("Field 'Name' must be filled");
});