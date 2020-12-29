const errorHandler = require("../utils/errorHandler");

class AddressValidator {
	validateCreationData(req, res, next) {
		const address = req.body;

		if (!address.neighborhood)
			return errorHandler("Field 'Neighborhood' must be filled", req, res);

		if (!address.zipcode)
			return errorHandler("Field 'Zipcode' must be filled", req, res);

		if (!address.street)
			return errorHandler("Field 'Street' must be filled", req, res);

		if (!address.number)
			return errorHandler("Field 'Number' must be filled", req, res);

		if (!Number.isInteger(address.number))
			return errorHandler("'Number' must contain only numbers", req, res);

		if (!address.cityId)
			return errorHandler("Field 'City Id' must be filled", req, res);

		if (!address.personId)
			return errorHandler("Field 'Person Id' must be filled", req, res);

		next();
	}
}

module.exports = new AddressValidator();