const BigBang = require("./BigBang");

class PersonCreated extends BigBang {
    static async start() {
        await super.start();
        const PersonSupport = require("../support/PersonSupport");
        await PersonSupport.authenticateEmployee();
        await PersonSupport.createFivePeople();
    }
}

module.exports = PersonCreated;