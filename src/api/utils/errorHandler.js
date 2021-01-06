module.exports = (err, req, res, next) => {
	const bundle = res || { errors: [] };
	const data = err ? [err] : [];
	let errors = [];

	if (err.constraint) {
		errors = errors.concat(`Constraint violation: ${err.constraint}`);
		return res.status(500).json({ errors });
	}

	if (bundle.errors || data) {
		console.log("aaaaaaaaaa");
		// errors = errors.concat(getMessages(bundle.errors));
		errors = errors.concat(data);
		// res.status(500).send({ errors: errors });
		res.status(500).json({ errors: ["aaaaaaaaa"] });
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