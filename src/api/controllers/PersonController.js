const { Op } = require("sequelize");
const Person = require("../models/Person");

class PersonController {
	async create(req, res) {
		try {
			const newPerson = await Person.create(req.body);
			return res.json(newPerson);
		} catch (error) {
			return res.status(500).json({ errors: [error.message] });
		}
	}

	async getAll(req, res) {
		try {
			const people = await Person.findAll({ order: [["name", "ASC"]] });
			return res.json(people);
		} catch (error) {
			return res.status(500).json({ errors: [error.message] });
		}
	}

	async getByName(req, res) {
		const { name } = req.params;
		var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

		try {
			const people = await Person.findAll({
				where: condition,
				order: [["name", "ASC"]]
			});

			return res.json(people);
		} catch (error) {
			return res.status(500).json({ errors: [error.message] });
		}
	}
}

module.exports = new PersonController();