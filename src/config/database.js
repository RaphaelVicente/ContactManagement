require("dotenv").config({
	path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
})

module.exports = {
	dialect: process.env.DB_DIALECT || "postgres",
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	storage: "./tests/database.sqlite",
	operatorAliases: false,
	logging: false,
	define: {
		timestamps: true,
		underscored: true,
		underscoredAll: true
	},
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
};