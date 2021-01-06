class StateValidator {
	validateCreationData(req, res, next) {
		const state = req.body;
		let errors = [];

		if (!state.name)
			errors.push("Field 'Name' must be filled");

		const regexValidator = /^[A-Za-z\s]+$/;

		if (!regexValidator.test(state.name))
			errors.push("Invalid 'Name'");

		if (!state.abbreviation)
			errors.push("Field 'Abbreviation' must be filled");

		if (!regexValidator.test(state.abbreviation))
			errors.push("Invalid 'Abbreviation'");

		if (!state.countryId)
			errors.push("Field 'Country Id' must be filled");

		if (errors.length > 0)
			return res.status(500).json({errors: errors});

		next();
	}
}

module.exports = new StateValidator();