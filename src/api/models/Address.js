const { Model, DataTypes } = require("sequelize");

class Address extends Model {
	static init(sequelize) {
		super.init({
			neighborhood: DataTypes.STRING,
			zipcode: DataTypes.INTEGER,
			street: DataTypes.STRING,
			number: DataTypes.INTEGER,
			complement: DataTypes.STRING
		}, {
			sequelize,
			tableName: "address"
		});
	}

	static associate(models) {
		this.belongsTo(models.City, { foreignKey: "cityId", as: "cityAddress" });
		this.belongsTo(models.Person, { foreignKey: "personId", as: "personAddress"});
	}
}

module.exports = Address;