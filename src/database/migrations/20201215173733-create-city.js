'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("city", {
			id: {
				type: Sequelize.BIGINT,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			state_id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				references: { model: "state", key: "id" },
				onUpdate: "CASCADE",
				onDelete: "CASCADE"
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false
			},
			area_code: {
				type: Sequelize.INTEGER,
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
		await queryInterface.dropTable("city");
	}
};
