const { Model, DataTypes } = require("sequelize");

class Person extends Model {
	static init(sequelize) {
		super.init({
			name: DataTypes.STRING,
			birthDate: DataTypes.DATEONLY,
			type: DataTypes.STRING
		}, {
			sequelize,
			tableName: "person"
		});
	}

	static associate(models) {
		this.hasMany(models.Address, { foreignKey: "personId", as: "personAddresses" });
		this.hasMany(models.Contact, { foreignKey: "personId", as: "personContacts" });
		this.hasOne(models.Employee, { foreignKey: "personId", as: "personEmployee" });
	}
}

module.exports = Person;