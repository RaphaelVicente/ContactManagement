class CityValidator {
	validateCreationData(req, res, next) {
		const city = req.body;
		let errors = [];

		if (!city.name)
			errors.push("Field 'Name' must be filled");

		const regexValidator = /^[A-Za-z\s]+$/;

		if (!regexValidator.test(city.name))
			errors.push("Invalid 'Name'");

		if (!city.areaCode)
			errors.push("Field 'Area Code' must be filled");

		if (!Number.isInteger(city.areaCode))
			errors.push("'Area Code' must contain only numbers");

		if (!city.stateId)
			errors.push("Field 'State Id' must be filled");

		if (errors.length > 0)
			return res.status(500).json({ errors: errors });

		next();
	}
}

module.exports = new CityValidator();