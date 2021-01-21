const CityPersonCreated = require("./environment/CityPersonCreated");
const AddressSupport = require("./support/AddressSupport");

beforeEach(async () => {
	await CityPersonCreated.start();
	await AddressSupport.authenticateEmployee();
	await AddressSupport.createAddress({
		neighborhood: "Zona 7",
		zipcode: "87030025",
		street: "Mandaguari",
		number: 2100,
		complement: "Ap 207"
	},
	"Maringa", "Luke");
});

test("Create address", async () => {
	const response = await AddressSupport.createAddress({
		neighborhood: "Centro",
		zipcode: "87030025",
		street: "Horacio",
		number: 5355,
		complement: "Sala 1"
	},
	"Maringa", "Luke");

	expect(response.status).toBe(200);
	expect(response.body.street).toBe("Horacio");
});

test("Return all addresses", async () => {
	const response = await AddressSupport.getAllAddresses();

	expect(response.status).toBe(200);
	expect(response.body).toHaveLength(1);
	expect(response.body[0].street).toBe("Mandaguari");
});

test("Return all addresses from city", async () => {
	const addressesMaringa = await AddressSupport.getAddressesFromCity("Maringa");

	expect(addressesMaringa.status).toBe(200);
	expect(addressesMaringa.body).toHaveLength(1);
	expect(addressesMaringa.body[0].street).toBe("Mandaguari");
});

test("Return all addresses from person", async () => {
	const response = await AddressSupport.getAddressesFromPerson("Luke");

	expect(response.status).toBe(200);
	expect(response.body).toHaveLength(1);
	expect(response.body[0].street).toBe("Mandaguari");
});

test("It does not create address without neighborhood", async () => {
	const response = await AddressSupport.createAddress({
		zipcode: "87030025",
		street: "Horacio",
		number: 5355,
		complement: "Sala 1"
	},
	"Maringa", "Luke");

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(1);
	expect(response.body.errors[0]).toBe("Field 'Neighborhood' must be filled");
});

test("It does not create address without zipcode", async () => {
	const response = await AddressSupport.createAddress({
		neighborhood: "Centro",
		street: "Horacio",
		number: 5355,
		complement: "Sala 1"
	},
	"Maringa", "Luke");

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(1);
	expect(response.body.errors[0]).toBe("Field 'Zipcode' must be filled");
});

test("It does not create address without number", async () => {
	const response = await AddressSupport.createAddress({
		neighborhood: "Centro",
		zipcode: "87030025",
		street: "Horacio",
		complement: "Sala 1"
	},
	"Maringa", "Luke");

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(2);
	expect(response.body.errors[0]).toBe("Field 'Number' must be filled");
	expect(response.body.errors[1]).toBe("'Number' must contain only numbers");
});

test("It does not create address with invalid number", async () => {
	const response = await AddressSupport.createAddress({
		neighborhood: "Centro",
		zipcode: "87030025",
		street: "Horacio",
		number: "5355A",
		complement: "Sala 1"
	},
	"Maringa", "Luke");

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(1);
	expect(response.body.errors[0]).toBe("'Number' must contain only numbers");
});

test("It does not create address without street", async () => {
	const response = await AddressSupport.createAddress({
		neighborhood: "Centro",
		zipcode: "87030025",
		number: 5355,
		complement: "Sala 1"
	},
	"Maringa", "Luke");

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(1);
	expect(response.body.errors[0]).toBe("Field 'Street' must be filled");
});

test("It does not create address without city", async () => {
	const response = await AddressSupport.createAddress({
		neighborhood: "Centro",
		zipcode: "87030025",
		street: "Horacio",
		number: 5355,
		complement: "Sala 1"
	},
	"", "Luke");

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(1);
	expect(response.body.errors[0]).toBe("Field 'City Id' must be filled");
});

test("It does not create address without person", async () => {
	const response = await AddressSupport.createAddress({
		neighborhood: "Centro",
		zipcode: "87030025",
		street: "Horacio",
		number: 5355,
		complement: "Sala 1"
	},
	"Maringa");

	expect(response.status).toBe(500);
	expect(response.body.errors).toHaveLength(1);
	expect(response.body.errors[0]).toBe("Field 'Person Id' must be filled");
});

test("It does not create address without information", async () => {
	const response = await AddressSupport.createAddress({});

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