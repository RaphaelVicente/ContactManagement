const CityCreated = require("./CityCreated");

class CityPersonCreated extends CityCreated {
	static async start() {
		await super.start();
		const PersonSupport = require("../support/PersonSupport");
		await PersonSupport.authenticateEmployee();
		await PersonSupport.createFivePeople();
	}
}

module.exports = CityPersonCreated;