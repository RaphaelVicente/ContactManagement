const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

				const salt = bcrypt.genSaltSync(10);
				req.body.personEmployee.password = bcrypt.hashSync(req.body.personEmployee.password, salt);
				const newPersonEmployee = await Person.create(req.body, { include: { model: Employee, as: "personEmployee" } });

				return res.json(newPersonEmployee);
			} catch (error) {
				return res.status(500).json({ errors: [error.message] });
			}
		}

		const username = req.body.username;

		try {
			const employee = await Employee.findOne({ where: { username: username } });

			if (employee)
				return res.status(500).json({ errors: [`Username ${username} already registered.`] });

			const person = await Person.findByPk(req.body.personId, {
				include: { model: Employee, as: "personEmployee" }
			});

			if (!person)
				return res.status(500).json({ errors: [`Does not exists a person with id ${req.body.personId}.`] });

			if (person.personEmployee)
				return res.status(500).json({ errors: [`Person ${person.name} has already been an Employee.`] });

			const salt = bcrypt.genSaltSync(10);
			req.body.password = bcrypt.hashSync(req.body.password, salt);

			const newEmployee = await Employee.create(req.body);

			return res.json(newEmployee);
		} catch (error) {
			return res.status(500).json({ errors: [error.message] });
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
			return res.status(500).json({ errors: [error.message] });
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
			return res.status(500).json({ errors: [error.message] });
		}
	}

	async authenticateEmployee(req, res) {
		const { username, password } = req.body;

		try {
			const employee = await Employee.findOne({
				where: { username: username },
				include: { model: Person, as: "personEmployee" }
			});

			if (!employee || !bcrypt.compareSync(password, employee.password))
				return res.status(403).json({ errors: ["Incorrect username or password"] });

			const expireTime = process.env.TOKEN_EXPIRE_TIME || "3h";
			const token = jwt.sign({ username: employee.username }, process.env.AUTH_SECRET, { expiresIn: expireTime });

			return res.json({
				token: token,
				authUser: { name: employee.personEmployee.name, username: employee.username }
			});
		} catch (error) {
			return res.status(500).json({ errors: [error.message] });
		}
	}

	async validateToken(req, res) {
		const token = req.body.token || "";

		jwt.verify(token, process.env.AUTH_SECRET, function (err, decoded) {
			if (!decoded)
				return res.status(500).json({ errors: ["Invalid token"] });

			return res.status(200).json({
				valid: !err,
				authUser: !err ? { username: decoded.authUser.username } : {}
			});
		});
	}
}

module.exports = new EmployeeController();