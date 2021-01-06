const Person = require("../models/Person");
const Employee = require("../models/Employee");

class EmployeeController {
	async create(req, res) {
		if (req.body.personEmployee) {
			const username = req.body.personEmployee.username;

			try {
				const employee = await Employee.findOne({ where: { username: username } });

				if (employee)
					return res.status(500).json({ errors: [`Username ${username} already registered.`] });

				const newPersonEmployee = await Person.create(req.body, { include: { model: Employee, as: "personEmployee" } });

				return res.json(newPersonEmployee);
			} catch (error) {
				return res.status(500).json({ errors: [error] });
			}
		}

		const username = req.body.username;

		try {
			const employee = await Employee.findOne({ where: { username: username } });

			if (employee)
				return res.status(500).json({ errors: [`Username ${username} already registered.`] });

			const newPersonEmployee = await Employee.create(req.body);

			return res.json(newPersonEmployee);
		} catch (error) {
			return res.status(500).json({ errors: [error] });
		}
	}

	async getAll(req, res) {
		try {
			const people = await Person.findAll({
				include: {
					model: Employee, as: "personEmployee",
					required: true
				},
				order: [["name", "ASC"]]
			});

			return res.json(people);
		} catch (error) {
			return res.status(500).json({ errors: [error] });
		}
	}

	async getByUsername(req, res) {
		const { username } = req.params;

		try {
			const employee = await Employee.findOne({
				where: { username: username },
				include: { model: Person, as: "personEmployee" }
			});

			return res.json(employee);
		} catch (error) {
			return res.status(500).json({ errors: [error] });
		}
	}
}

module.exports = new EmployeeController();