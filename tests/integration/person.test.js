const request = require("supertest");

const api = require("../../src/api");
const truncate = require("../utils/truncate");
const PersonSupport = require("../utils/PersonSupport");

beforeEach(async () => {
	await truncate();
	await PersonSupport.createFivePeople();
});

test("Create person", async () => {
	const response = await request(api).post("/person").send({
		name: "Test11",
		birthDate: "1989-11-07",
		type: "Legal"
	});

	expect(response.status).toBe(200);
	expect(response.body.name).toBe("Test11");
});

test("Return all people", async () => {
	const response = await request(api).get("/people").send();

	expect(response.status).toBe(200);
	expect(response.body.length).toBe(5);
});