const City = require("../models/City");
const State = require("../models/State");

class CityController {
	async create(req, res) {
		try {
			const city = await City.create(req.body);
			return res.json(city);
		} catch (error) {
			return res.status(500).json({ errors: [error.message] });
		}
	}

	async getAll(req, res) {
		try {
			const cities = await City.findAll({ order: [["name", "ASC"]] });
			return res.json(cities);
		} catch (error) {
			return res.status(500).json({ errors: [error.message] });
		}
	}

	async getCitiesFromState(req, res) {
		const { stateId } = req.params;

		try {
			const state = await State.findByPk(stateId, {
				include: { model: City, as: "stateCities" },
				order: [[{ model: City, as: "stateCities" }, "name", "ASC"]]
			});

			return res.json(state.stateCities);
		} catch (error) {
			return res.status(500).json({ errors: [error.message] });
		}
	}

	async getByName(req, res) {
		const { name } = req.params;

		try {
			const city = await City.findOne({ where: { name: name } });
			return res.json(city);
		} catch (error) {
			return res.status(500).json({ errors: [error.message] });
		}
	}
}

module.exports = new CityController();