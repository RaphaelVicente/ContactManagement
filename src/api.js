const express = require("express");
const bodyParser = require("body-parser");
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
		var corsOptions = {
			origin: "*"
		};

		this.express.use(cors(corsOptions));
		this.express.use(bodyParser.json());
		this.express.use(bodyParser.urlencoded({ extended: true }));
	}

	routes() {
		this.express.use(require("./routes"));
	}
}

module.exports = new ApiController().express;