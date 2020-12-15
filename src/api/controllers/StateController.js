const State = require("../models/State");
const Country = require("../models/Country");

class StateController {
	async create(req, res) {
		const state = await State.create(req.body);

		return res.json(state);
	}

	async getAll(req, res) {
		const states = await State.findAll({ order: [["name", "ASC"]] });

		return res.json(states);
	}

	async getStatesFromCountry(req, res) {
		const { countryId } = req.params;

		const country = await Country.findByPk(countryId, {
			include: { model: State, as: "countryStates" },
			order: [[{ model: State, as: "countryStates" }, "name", "ASC"]]
		});

		return res.json(country.countryStates);
	}

	async findByName(req, res) {
		const { name } = req.params;
		const state = await State.findOne({ where: { name: name } });

		return res.json(state);
	}
}

module.exports = new StateController();