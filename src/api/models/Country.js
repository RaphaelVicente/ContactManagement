const { Model, DataTypes } = require("sequelize");

class Country extends Model {
	static init(sequelize) {
		super.init({
			name: DataTypes.STRING,
			countryCode: DataTypes.INTEGER
		}, {
			sequelize,
			tableName: "country"
		});
	}

	static associate(models) {
		this.hasMany(models.State, { foreignKey: "countryId", as: "countryStates" });
	}
}

module.exports = Country;