const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

class Employee extends Model {
    static init(sequelize) {
        super.init({
            username: DataTypes.STRING,
            password: DataTypes.STRING,
            occupation: DataTypes.STRING,
            isAdmin: DataTypes.BOOLEAN
        },
        {
            sequelize,
            tableName: "employee"
        });
    }

    static associate(models) {
        this.belongsTo(models.Person, { foreignKey: "personId", as: "personEmployee"});
    }
}

module.exports = Employee;