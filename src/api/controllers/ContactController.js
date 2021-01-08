const Contact = require("../models/Contact");
const Person = require("../models/Person");

class ContactController {
	async create(req, res) {
		try {
			const contact = await Contact.create(req.body);
			return res.json(contact);
		} catch (error) {
			return res.status(500).json({ errors: [error] });
		}
	}

	async getContactsFromPerson(req, res) {
		const { personId } = req.params;

		try {
			const person = await Person.findByPk(personId, {
				include: { model: Contact, as: "personContacts" },
				order: [[{ model: Contact, as: "personContacts" }, "number", "ASC"]]
			});

			return res.json(person);
		} catch (error) {
			return res.status(500).json({ errors: [error] });
		}
	}
}

module.exports = new ContactController();