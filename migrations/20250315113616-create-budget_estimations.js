'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('budget_estimations', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    pricelist: {
      type: Sequelize.JSON,
      allowNull: false,
    },
    image_url: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('budget_estimations');
}
