const { Model, DataTypes } = require("sequelize");

class Contact extends Model {
	static init(sequelize) {
		super.init({
			contactType: DataTypes.STRING,
			countryCode: DataTypes.INTEGER,
			areaCode: DataTypes.INTEGER,
			number: DataTypes.INTEGER,
			email: DataTypes.STRING
		}, {
			sequelize,
			tableName: "contact"
		});
	}

	static associate(models) {
		this.belongsTo(models.Person, { foreignKey: "personId", as: "personContact" });
	}
}

module.exports = Contact;