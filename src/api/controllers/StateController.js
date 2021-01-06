const State = require("../models/State");
const Country = require("../models/Country");

class StateController {
	async create(req, res) {
		try {
			const state = await State.create(req.body);
			return res.json(state);
		} catch (error) {
			return res.status(500).json({ errors: error })
		}
	}

	async getAll(req, res) {
		try {
			const states = await State.findAll({ order: [["name", "ASC"]] });
			return res.json(states);
		} catch (error) {
			return res.status(500).json({ errors: error })
		}
	}

	async getStatesFromCountry(req, res) {
		const { countryId } = req.params;

		try {
			const country = await Country.findByPk(countryId, {
				include: { model: State, as: "countryStates" },
				order: [[{ model: State, as: "countryStates" }, "name", "ASC"]]
			});

			return res.json(country.countryStates);
		} catch (error) {
			return res.status(500).json({ errors: error })
		}
	}

	async getByName(req, res) {
		const { name } = req.params;

		try {
			const state = await State.findOne({ where: { name: name } });

			return res.json(state);
		} catch (error) {
			return res.status(500).json({ errors: error })
		}
	}
}

module.exports = new StateController();