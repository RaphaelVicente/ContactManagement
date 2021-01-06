const routes = require("express").Router();

const AddressController = require("./api/controllers/AddressController");
const CityController = require("./api/controllers/CityController");
const ContactController = require("./api/controllers/ContactController");
const CountryController = require("./api/controllers/CountryController");
const EmployeeController = require("./api/controllers/EmployeeController");
const PersonController = require("./api/controllers/PersonController");
const StateController = require("./api/controllers/StateController");

const AddressValidator = require("./api/validators/AddressValidator");
const CityValidator = require("./api/validators/CityValidator");
const CountryValidator = require("./api/validators/CountryValidator");
const EmployeeValidator = require("./api/validators/EmployeeValidator");
const PersonValidator = require("./api/validators/PersonValidator");
const StateValidator = require("./api/validators/StateValidator");

routes.post("/address", AddressValidator.validateCreationData, AddressController.create);
routes.get("/addresses", AddressController.getAll);
routes.get("/city/:cityId/addresses", AddressController.getAddressesFromCity);
routes.get("/person/:personId/addresses", AddressController.getAddressesFromPerson);

routes.post("/city", CityValidator.validateCreationData, CityController.create);
routes.get("/cities", CityController.getAll);
routes.get("/city/:name", CityController.getByName);
routes.get("/state/:stateId/cities", CityController.getCitiesFromState);

routes.post("/contact", ContactController.create);
routes.get("/person/:personId/contacts", ContactController.getContactsFromPerson);

routes.post("/country", CountryValidator.validateCreationData, CountryController.create);
routes.get("/countries", CountryController.getAll);
routes.get("/country/:name", CountryController.getByName);

routes.post("/employee", EmployeeValidator.validateCreationData, EmployeeController.create);
routes.get("/employees", EmployeeController.getAll);
routes.get("/employee/:username", EmployeeController.getByUsername);

routes.post("/person", PersonValidator.validateCreationData, PersonController.create);
routes.get("/people", PersonController.getAll);
routes.get("/people/:name", PersonController.getByName);

routes.post("/state", StateValidator.validateCreationData, StateController.create);
routes.get("/states", StateController.getAll);
routes.get("/state/:name", StateController.getByName);
routes.get("/country/:countryId/states", StateController.getStatesFromCountry);

module.exports = routes;