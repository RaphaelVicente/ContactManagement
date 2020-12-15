const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

class Employee extends Model {
    static init(sequelize) {
        super.init({
            username: DataTypes.STRING,
            password: DataTypes.STRING,
            occupation: DataTypes.STRING
        },
        {
            sequelize,
            tableName: "employee"
        },
        {
            hooks: {
                beforeSave: async employee => {
                    employee.password = await bcrypt.hash(employee.password, 8);
                }
            }
        });
    }

    static associate(models) {
        this.belongsTo(models.Physical, { foreignKey: "personId", as: "personEmployee"});
    }

    checkPassword(password) {
        return bcrypt.compare(password, this.password);
    }
}

module.exports = Employee;