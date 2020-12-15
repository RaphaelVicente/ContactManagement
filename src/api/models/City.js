const { Model, DataTypes } = require("sequelize");

class City extends Model {
	static init(sequelize) {
		super.init({
			name: DataTypes.STRING,
			areaCode: DataTypes.INTEGER
		}, {
			sequelize,
			tableName: "city"
		});
	}

	static associate(models) {
		this.belongsTo(models.State, { foreignKey: "stateId", as: "stateCity" });
		this.hasMany(models.Address, { foreignKey: "cityId", as: "cityAddresses" });
	}
}

module.exports = City;