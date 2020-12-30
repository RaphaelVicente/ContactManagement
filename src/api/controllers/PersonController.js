const { Op } = require("sequelize");
const Person = require("../models/Person");

class PersonController {
	async create(req, res) {
		const newPerson = await Person.create(req.body);

		return res.json(newPerson);
	}

	async getAll(req, res) {
		const people = await Person.findAll({ order: [["name", "ASC"]] });

		return res.json(people);
	}

	async findByName(req, res) {
		const { name } = req.params;
		var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
		const people = await Person.findAll({
			where: condition,
			order: [["name", "ASC"]]
		});

		return res.json(people);
	}
}

module.exports = new PersonController();