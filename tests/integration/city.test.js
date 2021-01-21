const StateCreated = require("./environment/StateCreated");
const CitySupport = require("./support/CitySupport");

beforeEach(async () => {
	await StateCreated.start();
	await CitySupport.authenticateEmployee();
	await CitySupport.createFiveCities();
});

test("Create city", async () => {
	const response = await CitySupport.createCity({ name: "Tupa", areaCode: 14 }, "Sao Paulo");

	expect(response.status).toBe(200);
	expect(response.body.name).toBe("Tupa");
	expect(response.body.areaCode).toBe(14);
});

test("Return a city by name", async () => {
	const response = await CitySupport.getCityByName("Pinhais");

	expect(response.status).toBe(200);
	expect(response.body.name).toBe("Pinhais");
	expect(response.body.areaCode).toBe(41);
});

test("Return all cities", async () => {
	const response = await CitySupport.getAllCities();

	expect(response.status).toBe(200);
	expect(response.body).toHaveLength(5);
	expect(response.body[0].name).toBe("Maringa");
	expect(response.body[1].name).toBe("Paranagua");
	expect(response.body[2].name).toBe("Pinhais");
	expect(response.body[3].name).toBe("Ponta Grossa");
	expect(response.body[4].name).toBe("Toledo");
});

test("Return all cities from state", async () => {
	const citiesParana = await CitySupport.getCitiesFromState("Parana");
	const citiesSaoPaulo = await CitySupport.getCitiesFromState("Sao Paulo");

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
	const response = await CitySupport.createCity({ areaCode: 14, }, "Sao Paulo");

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(1);
	expect(response.body.errors[0]).toBe("Field 'Name' must be filled");
});

test("It does not create city with invalid name", async () => {
	const response = await CitySupport.createCity({ name: "Tupa1", areaCode: 14 }, "Sao Paulo");

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(1);
	expect(response.body.errors[0]).toBe("Invalid 'Name'");
});

test("It does not create city without area code", async () => {
	const response = await CitySupport.createCity({ name: "Tupa" }, "Sao Paulo");

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(2);
	expect(response.body.errors[0]).toBe("Field 'Area Code' must be filled");
	expect(response.body.errors[1]).toBe("'Area Code' must contain only numbers");
});

test("It does not create city with invalid area code", async () => {
	const response = await CitySupport.createCity({ name: "Tupa", areaCode: "14a" }, "Sao Paulo");

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(1);
	expect(response.body.errors[0]).toBe("'Area Code' must contain only numbers");
});

test("It does not create city without state", async () => {
	const response = await CitySupport.createCity({ name: "Tupa", areaCode: 14 }, "");

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(1);
	expect(response.body.errors[0]).toBe("Field 'State Id' must be filled");
});

test("It does not create city without any information", async () => {
	const response = await CitySupport.createCity({}, "");

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(4);
	expect(response.body.errors[0]).toBe("Field 'Name' must be filled");
	expect(response.body.errors[1]).toBe("Field 'Area Code' must be filled");
	expect(response.body.errors[2]).toBe("'Area Code' must contain only numbers");
	expect(response.body.errors[3]).toBe("Field 'State Id' must be filled");
});