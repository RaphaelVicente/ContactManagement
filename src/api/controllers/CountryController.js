const Country = require("../models/Country");

class CountryController {
	async create(req, res) {
		const country = await Country.create(req.body);

		return res.json(country);
	}

	async getAll(req, res) {
		const countries = await Country.findAll({ order: [["name", "ASC"]] });

		return res.json(countries);
	}

	async findByName(req, res) {
		const { name } = req.params;
		const country = await Country.findOne({ where: { name: name } });

		return res.json(country);
	}
}

module.exports = new CountryController();