'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("state", {
			id: {
				type: Sequelize.BIGINT,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			country_id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				references: { model: "country", key: "id" },
				onUpdate: "CASCADE",
				onDelete: "CASCADE"
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false
			},
			abbreviation: {
				type: Sequelize.STRING,
				allowNull: false
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
		await queryInterface.dropTable("state");
	}
};
