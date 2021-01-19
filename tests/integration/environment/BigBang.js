const Connection = require('../../../src/api/models/index');
const truncate = require("../support/truncate");

class BigBang {
    static async start() {
        await truncate();
        await this.createStarterPerson();
    }

    static async createStarterPerson() {
        await Connection.queryInterface.bulkInsert('person', [
			{ name: "Admin", birth_date: "1989-01-01", type: "Individual", created_at: new Date(), updated_at: new Date() }
		]);

		const people = await Connection.queryInterface.sequelize.query('SELECT id from person');
		const person = people[0][0];

		await Connection.queryInterface.bulkInsert('employee', [
			{ username: "admin", password: "admin", occupation: "admin", is_admin: true, person_id: person.id, created_at: new Date(), updated_at: new Date() }
		]);
    }
}

module.exports = BigBang;