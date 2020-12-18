module.exports = (error, req, res, next, status = 500) => {
	if (!res || !res.locals) {
		throw error;
	}

	const bundle = res.locals.bundle || { errors: [] };
	let data = error ? [error] : [];
	let errors = [];

	if (error.constraint) {
		errors = errors.concat(`Constraint violation: ${error.constraint}`);
		return res.status(status).json({ errors });
	}

	if (bundle.errors || data) {
		errors = errors.concat(getMessages(bundle.errors));
		errors = errors.concat(data);
		res.status(status).json({ errors });
	}
	else
		next();
};

const getMessages = (errors) => {
	let arrErrors = [];
	errors.forEach((error) => {
		arrErrors.push(error.message);
	});

	return arrErrors;
};