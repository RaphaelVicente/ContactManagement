const StateCreated = require("./StateCreated");

class CityCreated extends StateCreated {
	static async start() {
		await super.start();
		const CitySupport = require("../support/CitySupport");
		await CitySupport.authenticateEmployee();
		await CitySupport.createFiveCities();
	}
}

module.exports = CityCreated;