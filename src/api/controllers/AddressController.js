const Address = require("../models/Address");
const City = require("../models/City");
const Person = require("../models/Person");

class AddressController {
	async create(req, res) {
		try {
			const address = await Address.create(req.body);
			return res.json(address);
		} catch (error) {
			return res.status(500).json({ errors: [error] });
		}
	}

	async getAll(req, res) {
		try {
			const addresses = await Address.findAll();
			return res.json(addresses);
		} catch (error) {
			return res.status(500).json({ errors: [error] });
		}
	}

	async getAddressesFromPerson(req, res) {
		const { personId } = req.params;

		try {
			const person = await Person.findByPk(personId, {
				include: { model: Address, as: "personAddresses" },
				order: [[{ model: Address, as: "personAddresses" }, "street", "ASC"]]
			});

			return res.json(person.personAddresses);
		} catch (error) {
			return res.status(500).json({ errors: [error] });
		}
	}

	async getAddressesFromCity(req, res) {
		const { cityId } = req.params;

		try {
			const city = await City.findByPk(cityId, {
				include: { model: Address, as: "cityAddresses" },
				order: [[{ model: Address, as: "cityAddresses" }, "street", "ASC"]]
			});

			return res.json(city.cityAddresses);
		} catch (error) {
			return res.status(500).json({ errors: [error] });
		}
	}
}

module.exports = new AddressController();