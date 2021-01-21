const CountryCreated = require("./environment/CountryCreated");
const StateSupport = require("./support/StateSupport");

beforeEach(async () => {
	await CountryCreated.start();
	await StateSupport.authenticateEmployee();
	await StateSupport.createFiveStates();
});

test("Create state", async () => {
	const response = await StateSupport.createState({ name: "Mato Grosso", abbreviation: "MT" }, "Brazil");

	expect(response.status).toBe(200);
	expect(response.body.name).toBe("Mato Grosso");
	expect(response.body.abbreviation).toBe("MT");
});

test("Return a state by name", async () => {
	const response = await StateSupport.getStateByName("Parana");

	expect(response.status).toBe(200);
	expect(response.body.name).toBe("Parana");
	expect(response.body.abbreviation).toBe("PR");
});

test("Return all states", async () => {
	const response = await StateSupport.getAllStates();

	expect(response.status).toBe(200);
	expect(response.body).toHaveLength(5);
	expect(response.body[0].name).toBe("Minas Gerais");
	expect(response.body[1].name).toBe("Parana");
	expect(response.body[2].name).toBe("Rio Grande do Sul");
	expect(response.body[3].name).toBe("Santa Catarina");
	expect(response.body[4].name).toBe("Sao Paulo");
});

test("Return all states from country", async () => {
	const statesBrasil = await StateSupport.getStatesFromCountry("Brazil");
	const statesInglaterra = await StateSupport.getStatesFromCountry("England")

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
	const response = await StateSupport.createState({ abbreviation: "MT" }, "Brazil");
	
	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(1);
	expect(response.body.errors[0]).toBe("Field 'Name' must be filled");
});

test("It does not create state with invalid name", async () => {
	const response = await StateSupport.createState({ name: "Mato Grosso2", abbreviation: "MT" }, "Brazil");

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(1);
	expect(response.body.errors[0]).toBe("Invalid 'Name'");
});

test("It does not create state without abbreviation", async () => {
	const response = await StateSupport.createState({ name: "Mato Grosso" }, "Brazil");

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(1);
	expect(response.body.errors[0]).toBe("Field 'Abbreviation' must be filled");
});

test("It does not create state with invalid abbreviation", async () => {
	const response = await StateSupport.createState({ name: "Mato Grosso", abbreviation: "MT2" }, "Brazil")

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(1);
	expect(response.body.errors[0]).toBe("Invalid 'Abbreviation'");
});

test("It does not create state without country", async () => {
	const response = await StateSupport.createState({ name: "Mato Grosso", abbreviation: "MT" }, "")

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(1);
	expect(response.body.errors[0]).toBe("Field 'Country Id' must be filled");
});

test("It does not create state without any information", async () => {
	const response = await StateSupport.createState({ }, "")

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(3);
	expect(response.body.errors[0]).toBe("Field 'Name' must be filled");
	expect(response.body.errors[1]).toBe("Field 'Abbreviation' must be filled");
	expect(response.body.errors[2]).toBe("Field 'Country Id' must be filled");
});