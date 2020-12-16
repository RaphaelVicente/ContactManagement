const Address = require("../models/Address");
const City = require("../models/City");
const Person = require("../models/Person");

class AddressController {
	async create(req, res) {
		const address = await Address.create(req.body);

		return res.json(address);
	}

	async getAll(req, res) {
		const addresses = await Address.findAll();

		return res.json(addresses);
	}

	async getAddressesFromPerson(req, res) {
		const { personId } = req.params;

		const person = await Person.findByPk(personId, {
			include: { model: Address, as: "personAddresses" },
			order: [[{ model: Address, as: "personAddresses" }, "street", "ASC"]]
		});

		return res.json(person.personAddresses);
	}

	async getAddressesFromCity(req, res) {
		const { cityId } = req.params;

		const city = await City.findByPk(cityId, {
			include: { model: Address, as: "cityAddresses" },
			order: [[{ model: Address, as: "cityAddresses" }, "street", "ASC"]]
		});

		return res.json(city.cityAddresses);
	}
}

module.exports = new AddressController();