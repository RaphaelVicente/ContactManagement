const express = require("express");
const authRoutes = express.Router();
const unauthRoutes = express.Router();

const auth = require('./auth')

const AddressController = require("./api/controllers/AddressController");
const CityController = require("./api/controllers/CityController");
const ContactController = require("./api/controllers/ContactController");
const CountryController = require("./api/controllers/CountryController");
const EmployeeController = require("./api/controllers/EmployeeController");
const PersonController = require("./api/controllers/PersonController");
const StateController = require("./api/controllers/StateController");

const AddressValidator = require("./api/validators/AddressValidator");
const CityValidator = require("./api/validators/CityValidator");
const ContactValidator = require("./api/validators/ContactValidator");
const CountryValidator = require("./api/validators/CountryValidator");
const EmployeeValidator = require("./api/validators/EmployeeValidator");
const PersonValidator = require("./api/validators/PersonValidator");
const StateValidator = require("./api/validators/StateValidator");

unauthRoutes.post('/auth', EmployeeController.authenticateEmployee);
unauthRoutes.post('/validateToken', EmployeeController.validateToken);

authRoutes.use(auth);

authRoutes.post("/address", AddressValidator.validateCreationData, AddressController.create);
authRoutes.get("/addresses", AddressController.getAll);
authRoutes.get("/city/:cityId/addresses", AddressController.getAddressesFromCity);
authRoutes.get("/person/:personId/addresses", AddressController.getAddressesFromPerson);

authRoutes.post("/city", CityValidator.validateCreationData, CityController.create);
authRoutes.get("/cities", CityController.getAll);
authRoutes.get("/city/:name", CityController.getByName);
authRoutes.get("/state/:stateId/cities", CityController.getCitiesFromState);

authRoutes.post("/contact", ContactValidator.validateCreationData, ContactController.create);
authRoutes.get("/person/:personId/contacts", ContactController.getContactsFromPerson);

authRoutes.post("/country", CountryValidator.validateCreationData, CountryController.create);
authRoutes.get("/countries", CountryController.getAll);
authRoutes.get("/country/:name", CountryController.getByName);

authRoutes.post("/employee", EmployeeValidator.validateCreationData, EmployeeController.create);
authRoutes.get("/employees", EmployeeController.getAll);
authRoutes.get("/employee/:username", EmployeeController.getByUsername);

authRoutes.post("/person", PersonValidator.validateCreationData, PersonController.create);
authRoutes.get("/people", PersonController.getAll);
authRoutes.get("/people/:name", PersonController.getByName);

authRoutes.post("/state", StateValidator.validateCreationData, StateController.create);
authRoutes.get("/states", StateController.getAll);
authRoutes.get("/state/:name", StateController.getByName);
authRoutes.get("/country/:countryId/states", StateController.getStatesFromCountry);

module.exports = {
    authRoutes: authRoutes,
    unauthRoutes: unauthRoutes
};