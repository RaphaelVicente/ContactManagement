const errorHandler = require("../utils/errorHandler");

class CityValidator {
	validateCreationData(req, res, next) {
		const city = req.body;

		if (!city.name)
			return errorHandler("Field 'Name' must be filled", req, res);

		let regexValidator = /^[A-Za-z\s]+$/;

		if (!regexValidator.test(city.name))
			return errorHandler("Invalid 'Name'", req, res);

		if (!city.areaCode)
			return errorHandler("Field 'Area Code' must be filled", req, res);

		if (!Number.isInteger(city.areaCode))
			return errorHandler("'Area Code' must contain only numbers", req, res);

		if (!city.stateId)
			return errorHandler("Field 'State Id' must be filled", req, res);

		next();
	}
}

module.exports = new CityValidator();