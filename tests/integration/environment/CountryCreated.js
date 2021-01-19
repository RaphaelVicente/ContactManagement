const BigBang = require("./BigBang");

class CountryCreated extends BigBang {
    static async start() {
        await super.start();
        const CountrySupport = require("../support/CountrySupport");
        await CountrySupport.authenticateEmployee();
        await CountrySupport.createFiveCountries();
    }
}

module.exports = CountryCreated;