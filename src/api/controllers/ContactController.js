const Contact = require("../models/Contact");
const Person = require("../models/Person");

class ContactController {
    async create(req, res) {
        const contact = await Contact.create(req.body);

        return res.json(contact);
    }

    async getContactsFromPerson(req, res) {
        const { personId } = req.params;

		const person = await Person.findByPk(personId, {
			include: { model: Contact, as: "personContacts" },
			order: [[{ model: Contact, as: "personContacts" }, "number", "ASC"]]
        });
        
        return res.json(person);
    }
}

module.exports = new ContactController();