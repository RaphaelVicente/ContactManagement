const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
	if (req.method === 'OPTIONS')
		next();

	else {
		const authorization = req.headers['authorization'];
		if (!authorization)
			return res.status(403).json({ errors: ['Header authorization not defined'] });

		const token = JSON.parse(authorization);

		if (!token)
			return res.status(403).json({ errors: ['Header authorization not defined'] });

		jwt.verify(token, process.env.AUTH_SECRET, function (err, decode) {
			if (err) {
				return res.status(403).json({ errors: ['Invalid token'] });
			}
			else {
				req.tokenDecode = decode
				next();
			}
		});
	}
}