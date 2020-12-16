const Sequelize = require("sequelize");
const dbConfig = require("../../config/database");

const Address = require("./Address");
const City = require("./City");
const Contact = require("./Contact");
const Country = require("./Country");
const Employee = require("./Employee");
const Person = require("./Person");
const State = require("./State");

const sequelize = new Sequelize(dbConfig);

Address.init(sequelize);
City.init(sequelize);
Contact.init(sequelize);
Country.init(sequelize);
Employee.init(sequelize);
Person.init(sequelize);
State.init(sequelize);

Address.associate(sequelize.models);
City.associate(sequelize.models);
Contact.associate(sequelize.models);
Country.associate(sequelize.models);
Employee.associate(sequelize.models);
Person.associate(sequelize.models);
State.associate(sequelize.models);

module.exports = sequelize;