const Person = require("../models/Person");
const Employee = require("../models/Employee");

class EmployeeController {
	async create(req, res) {
		const employee = await Employee.findOne({ where: { username: req.body.username } });

		if (employee)
			return res.status(500).json({ error: `Username ${req.body.username} already registered.` });

		const newEmployee = await Employee.create(req.body);

		return res.json(newEmployee);
	}

	async getAll(req, res) {
		const people = await Person.findAll({
			include: {
				model: Employee, as: "personEmployee",
				required: true
			},
			order: [["name", "ASC"]]
		});

		return res.json(people);
	}
}

module.exports = new EmployeeController();