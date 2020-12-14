const Sequelize = require("sequelize");
const dbConfig = require("../../config/database");

const Country = require("./Country");

const connection = new Sequelize(dbConfig);

Country.init(connection);

module.exports = connection;