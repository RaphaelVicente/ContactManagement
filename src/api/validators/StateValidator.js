const errorHandler = require("../utils/errorHandler");

class StateValidator {
	validateCreationData(req, res, next) {
		const state = req.body;

		if (!state.name)
			return errorHandler("Field 'Name' must be filled", req, res);

		let regexValidator = /^[A-Za-z\s]+$/;

		if (!regexValidator.test(state.name))
			return errorHandler("Invalid 'Name'", req, res);

		if (!state.abbreviation)
			return errorHandler("Field 'Abbreviation' must be filled", req, res);

		if (!regexValidator.test(state.abbreviation))
			return errorHandler("Invalid 'Abbreviation'", req, res);

		if (!state.countryId)
			return errorHandler("Field 'Country Id' must be filled", req, res);

		next();
	}
}

module.exports = new StateValidator();