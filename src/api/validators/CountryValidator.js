const errorHandler = require("../utils/errorHandler");

class CountryValidator {
    validateCreationData(req, res, next) {
		const country = req.body;

		if (!country.name)
			return errorHandler("Field 'Name' must be filled", req, res);
		
		let regexNameValidator = /^[A-Za-z\s]+$/;
		
		if (!regexNameValidator.test(country.name))
			return errorHandler("Invalid 'Name'", req, res);

		if (!country.countryCode)
			return errorHandler("Field 'Country Code' must be filled", req, res);

		if (!Number.isInteger(country.countryCode))
			return errorHandler("'Country Code' must contain only numbers", req, res);
		
		next();
	}
}

module.exports = new CountryValidator();