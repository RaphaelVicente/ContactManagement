const Country = require("../models/Country");

class CountryController {
	async create(req, res) {
		try {
			const country = await Country.create(req.body);
			return res.json(country);
		} catch (error) {
			return res.status(500).json({ errors: [error] });
		}
	}

	async getAll(req, res) {
		try {
			const countries = await Country.findAll({ order: [["name", "ASC"]] });
			return res.json(countries);
		} catch (error) {
			return res.status(500).json({ errors: [error] });
		}
	}

	async getByName(req, res) {
		const { name } = req.params;
		try {
			const country = await Country.findOne({ where: { name: name } });
			return res.json(country);
		} catch (error) {
			return res.status(500).json({ errors: [error] });
		}
	}
}

module.exports = new CountryController();