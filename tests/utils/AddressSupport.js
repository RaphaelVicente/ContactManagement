const request = require("supertest");
const api = require("../../src/api");

class AddressSupport {
	async createAddress(city, person) {
		return await request(api).post("/address").send({
            neighborhood: "Zona 7",
            zipcode: "87030025",
            street: "Mandaguari",
            number: 2100,
            complement: "Ap 207",
            cityId: city.id,
            personId: person.id
        });
	}
}

module.exports = new AddressSupport();