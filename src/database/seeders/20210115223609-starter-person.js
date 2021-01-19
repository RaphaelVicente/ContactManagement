'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('person', [
			{ name: "Admin", birth_date: "1989-01-01", type: "Individual", created_at: new Date(), updated_at: new Date() }
		]);

		const people = await queryInterface.sequelize.query('SELECT id from person;');

		const person = people[0];

		return await queryInterface.bulkInsert('employee', [
			{ username: "admin", password: "admin", occupation: "admin", is_admin: true, person_id: person.id, created_at: new Date(), updated_at: new Date() }
		]);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('employee', null, {});
		return await queryInterface.bulkDelete('person', null, {});
	}
};
