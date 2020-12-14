const Connection = require('../../src/api/models/index');

module.exports = () => {
	return Promise.all(Object.keys(Connection.models).map(key => {
		return Connection.models[key].destroy({ truncate: true, force: true });
	}));
};