const { Model, DataTypes } = require('sequelize');

class Country extends Model {
	static init(sequelize) {
		super.init({
			name: DataTypes.STRING,
			countryCode: DataTypes.INTEGER
		},
			{
				sequelize,
				tableName: 'country'
			});
	}
}

module.exports = Country;