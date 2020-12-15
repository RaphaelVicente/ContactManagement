const City = require("../models/City");
const State = require("../models/State");

class CityController {
	async create(req, res) {
		const city = await City.create(req.body);

		return res.json(city);
	}

	async getAll(req, res) {
		const cities = await City.findAll({ order: [["name", "ASC"]] });

		return res.json(cities);
	}

	async getCitiesFromState(req, res) {
		const { stateId } = req.params;

		const state = await State.findByPk(stateId, {
			include: { model: City, as: "stateCities" },
			order: [[{ model: City, as: "stateCities" }, "name", "ASC"]]
		});

		return res.json(state.stateCities);
	}

	async findByName(req, res) {
		const { name } = req.params;
		const city = await City.findOne({ where: { name: name } });

		return res.json(city);
	}
}

module.exports = new CityController();