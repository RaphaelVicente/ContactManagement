class CountryValidator {
    validateCreationData(req, res, next) {
		const country = req.body;
		let errors = [];

		if (!country.name)
			errors.push("Field 'Name' must be filled");
		
		const regexNameValidator = /^[A-Za-z\s]+$/;
		
		if (!regexNameValidator.test(country.name))
			errors.push("Invalid 'Name'");

		if (!country.countryCode)
			errors.push("Field 'Country Code' must be filled");

		if (!Number.isInteger(country.countryCode))
			errors.push("'Country Code' must contain only numbers");

		if (errors.length > 0)
            return res.status(500).json({errors: errors});
		
		next();
	}
}

module.exports = new CountryValidator();