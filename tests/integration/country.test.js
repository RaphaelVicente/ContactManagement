const request = require("supertest");

const api = require("../../src/api");
const truncate = require("../utils/truncate");
const CountrySupport = require("../utils/CountrySupport");

beforeEach(async () => {
	await truncate();
	await CountrySupport.createFiveCountries();
});

test("Create country", async () => {
	const response = await request(api).post("/country").send({ name: "Switzerland", countryCode: 41 });

	expect(response.status).toBe(200);
	expect(response.body.name).toBe("Switzerland");
});

test("Return all countries", async () => {
	const response = await request(api).get("/countries").send();

	expect(response.status).toBe(200);
	expect(response.body).toHaveLength(5);
	expect(response.body[0].name).toBe("Brazil");
	expect(response.body[1].name).toBe("England");
	expect(response.body[2].name).toBe("Germany");
	expect(response.body[3].name).toBe("Ireland");
	expect(response.body[4].name).toBe("United States");
});

test("Return a country by name", async () => {
	const response = await request(api).get("/country/England").send();

	expect(response.status).toBe(200);
	expect(response.body.name).toBe("England");
	expect(response.body.countryCode).toBe(44);
});

test("It does not create country without code", async () => {
	const response = await request(api).post("/country").send({ name: "Switzerland" });

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(2);
	expect(response.body.errors[0]).toBe("Field 'Country Code' must be filled");
	expect(response.body.errors[1]).toBe("'Country Code' must contain only numbers");
});

test("It does not create country with invalid code", async () => {
	const response = await request(api).post("/country").send({ name: "England", countryCode: "4a" });

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(1);
	expect(response.body.errors[0]).toBe("'Country Code' must contain only numbers");
});

test("It does not create country without name", async () => {
	const response = await request(api).post("/country").send({ countryCode: 41 });

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(1);
	expect(response.body.errors[0]).toBe("Field 'Name' must be filled");
});

test("It does not create country with invalid name", async () => {
	const response = await request(api).post("/country").send({ name: "England1", countryCode: 44 });

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(1);
	expect(response.body.errors[0]).toBe("Invalid 'Name'");
});

test("It does not create country without any information", async () => {
	const response = await request(api).post("/country").send({});

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(3);
	expect(response.body.errors[0]).toBe("Field 'Name' must be filled");
	expect(response.body.errors[1]).toBe("Field 'Country Code' must be filled");
	expect(response.body.errors[2]).toBe("'Country Code' must contain only numbers");
});