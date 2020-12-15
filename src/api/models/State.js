const { Model, DataTypes } = require("sequelize");

class State extends Model {
	static init(sequelize) {
		super.init({
			name: DataTypes.STRING,
			abbreviation: DataTypes.STRING
		}, {
			sequelize,
			tableName: "state"
		});
	}

	static associate(models) {
		this.belongsTo(models.Country, { foreignKey: "countryId", as: "countryState" });
		this.hasMany(models.City, { foreignKey: "stateId", as: "stateCities" });
	}
}

module.exports = State;