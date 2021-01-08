class ContactValidator {
	validateCreationData(req, res, next) {
		const contact = req.body;
		let errors = [];

		if (!contact.contactType)
			errors.push("Field 'Contact Type' must be filled");

		if (!contact.areaCode)
			errors.push("Field 'Area Code' must be filled");

		if (!Number.isInteger(contact.areaCode))
			errors.push("'Area Code' must contain only numbers");

		if (!contact.countryCode)
			errors.push("Field 'Country Code' must be filled");

		if (!Number.isInteger(contact.countryCode))
			errors.push("'Country Code' must contain only numbers");

		if (!contact.number)
			errors.push("Field 'Number' must be filled");

		if (!Number.isInteger(contact.number))
			errors.push("'Number' must contain only numbers");

		const regexValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (contact.email && !regexValidator.test(contact.email))
			errors.push("Invalid 'E-mail'");

		if (!contact.personId)
			errors.push("Field 'Person Id' must be filled");

		if (errors.length > 0)
			return res.status(500).json({ errors: errors });

		next();
	}
}

module.exports = new ContactValidator();