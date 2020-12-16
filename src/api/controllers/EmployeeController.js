const Person = require("../models/Person");
const Employee = require("../models/Employee");

class EmployeeController {
	async create(req, res) {
		if (req.body.personEmployee) {
			const username = req.body.personEmployee.username;
			const employee = await Employee.findOne({ where: { username: username } });

			if (employee)
				return res.status(500).json({ error: `Username ${username} already registered.` });

			const newPersonEmployee = await Person.create(req.body, { include: { model: Employee, as: "personEmployee" } });

			return res.json(newPersonEmployee);
		}

		const username = req.body.username;
		const employee = await Employee.findOne({ where: { username: username } });

		if (employee)
			return res.status(500).json({ error: `Username ${username} already registered.` });

		const newPersonEmployee = await Employee.create(req.body);

		return res.json(newPersonEmployee);
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

	async getByUsername(req, res) {
		const { username } = req.params;
		const employee = await Employee.findOne({
			where: { username: username },
			include: { model: Person, as: "personEmployee" }
		});

		return res.json(employee);
	}
}

module.exports = new EmployeeController();