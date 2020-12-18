const errorHandler = require("../utils/errorHandler");

class CountryValidator {
    validateCreationData(req, res, next) {
		const country = req.body;

		if (!country.name)
			return errorHandler("Field 'Name' must be filled", req, res);
		
		if (!country.countryCode)
			return errorHandler("Field 'Country Code' must be filled", req, res);

		next();
	}
}

module.exports = new CountryValidator();