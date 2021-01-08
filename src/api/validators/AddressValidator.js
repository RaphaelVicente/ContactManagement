class AddressValidator {
	validateCreationData(req, res, next) {
		const address = req.body;
		let errors = [];

		if (!address.neighborhood)
			errors.push("Field 'Neighborhood' must be filled");

		if (!address.zipcode)
			errors.push("Field 'Zipcode' must be filled");

		if (!address.street)
			errors.push("Field 'Street' must be filled");

		if (!address.number)
			errors.push("Field 'Number' must be filled");

		if (!Number.isInteger(address.number))
			errors.push("'Number' must contain only numbers");

		if (!address.cityId)
			errors.push("Field 'City Id' must be filled");

		if (!address.personId)
			errors.push("Field 'Person Id' must be filled");

		if (errors.length > 0)
			return res.status(500).json({ errors: errors });

		next();
	}
}

module.exports = new AddressValidator();