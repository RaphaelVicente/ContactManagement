const express = require("express");
const bodyParser = require("body-parser");
const { authRoutes, unauthRoutes } = require("./routes");
const cors = require("cors");
require("./api/models")

require("dotenv").config({
	path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
})

class ApiController {
	constructor() {
		this.express = express();

		this.middlewares();
		this.routes();
	}

	middlewares() {
		let corsOptions = {
			origin: "*"
		};

		this.express.use(cors(corsOptions));
		this.express.use(bodyParser.json());
		this.express.use(bodyParser.urlencoded({ extended: true }));
	}

	routes() {
		this.express.use("/au", authRoutes);
		this.express.use("/unau", unauthRoutes);
	}
}

module.exports = new ApiController().express;