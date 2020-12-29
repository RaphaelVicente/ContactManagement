'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("address", {
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
			city_id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				references: { model: "city", key: "id" },
				onUpdate: "CASCADE",
				onDelete: "CASCADE"
			},
			neighborhood: {
				type: Sequelize.STRING,
				allowNull: false
			},
			zipcode: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			street: {
				type: Sequelize.STRING,
				allowNull: false
			},
			number: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			complement: {
				type: Sequelize.STRING
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
		await queryInterface.dropTable("address");
	}
};
