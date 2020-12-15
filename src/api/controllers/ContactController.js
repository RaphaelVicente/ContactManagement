const Contact = require("../models/Contact");

module.exports = {
    async create(req, res) {
        const contact = await Contact.create(req.body);

        return res.json(contact);
    },

    async getAll(req, res) {
        const contacts = await Contact.findAll();

        return res.json(contacts);
    }
};