'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("contact", {
			id: {
				type: Sequelize.BIGINT,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			person_id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				references: { model: "person", key: "id" },
				onUpdate: "CASCADE",
				onDelete: "CASCADE"
			},
			contact_type: {
				type: Sequelize.STRING,
				allowNull: false
			},
			country_code: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			area_code: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			number: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			email: {
				type: Sequelize.STRING,
				allowNull: true
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false
			}
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("contact");
	}
};
