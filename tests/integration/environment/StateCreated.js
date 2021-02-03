const CountryCreated = require("./CountryCreated");

class StateCreated extends CountryCreated {
	static async start() {
		await super.start();
		const StateSupport = require("../support/StateSupport");
		await StateSupport.authenticateEmployee();
		await StateSupport.createFiveStates();
	}
}

module.exports = StateCreated;