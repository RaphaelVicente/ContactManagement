const routes = require("express").Router();

const AddressController = require("./api/controllers/AddressController");
const CityController = require("./api/controllers/CityController");
const ContactController = require("./api/controllers/ContactController");
const CountryController = require("./api/controllers/CountryController");
const EmployeeController = require("./api/controllers/EmployeeController");
const PersonController = require("./api/controllers/PersonController");
const StateController = require("./api/controllers/StateController");

routes.post("/address", AddressController.create);
routes.get("/addresses", AddressController.getAll);
routes.get("/city/:cityId/addresses", AddressController.getAddressesFromCity);
routes.get("/person/:personId/addresses", AddressController.getAddressesFromPerson);

routes.post("/city", CityController.create);
routes.get("/cities", CityController.getAll);
routes.get("/city/:name", CityController.findByName);
routes.get("/state/:stateId/cities", CityController.getCitiesFromState);

routes.post("/contact", ContactController.create);
routes.get("/person/:personId/contacts", ContactController.getContactsFromPerson);

routes.post("/country", CountryController.create);
routes.get("/countries", CountryController.getAll);
routes.get("/country/:name", CountryController.findByName);

routes.post("/employee", EmployeeController.create);
routes.get("/employees", EmployeeController.getAll);
routes.get("/employee/:username", EmployeeController.getByUsername);

routes.post("/person", PersonController.create);
routes.get("/people", PersonController.getAll);
routes.get("/people/:name", PersonController.findByName);

routes.post("/state", StateController.create);
routes.get("/states", StateController.getAll);
routes.get("/state/:name", StateController.findByName);
routes.get("/country/:countryId/states", StateController.getStatesFromCountry);

module.exports = routes;