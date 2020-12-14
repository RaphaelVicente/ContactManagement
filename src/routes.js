const routes = require("express").Router();

const CountryController = require("./api/controllers/CountryController");

routes.post("/country", CountryController.create);
routes.get("/country", CountryController.getAll);
routes.get("/country/:name", CountryController.findByName);

module.exports = routes;