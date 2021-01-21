const request = require("supertest");
const api = require("../../../src/api");
const Support = require("./Support");

class AddressSupport extends Support {
	async createAddress(address, cityName, personName) {
        const personResp = await request(api).get(`/au/people/${personName}`).set("Authorization", this.token).send();
        const cityResp = await request(api).get(`/au/city/${cityName}`).set("Authorization", this.token).send();
        const person = personResp.body[0];
		const city = cityResp.body;

		if (city)
            address.cityId = city.id;
            
        if (person)
            address.personId = person.id;
        
		return await request(api).post("/au/address").set("Authorization", this.token).send(address);
    }

    async getAllAddresses() {
        return await request(api).get("/au/addresses").set("Authorization", this.token).send();
    }

    async getAddressesFromCity(cityName) {
        const cityResp = await request(api).get(`/au/city/${cityName}`).set("Authorization", this.token).send();
        const city = cityResp.body;
        return await request(api).get(`/au/city/${city.id}/addresses`).set("Authorization", this.token).send();
    }

    async getAddressesFromPerson(personName) {
        const personResp = await request(api).get(`/au/people/${personName}`).set("Authorization", this.token).send();
        const person = personResp.body[0];
        return await request(api).get(`/au/person/${person.id}/addresses`).set("Authorization", this.token).send();
    }
}

module.exports = new AddressSupport();