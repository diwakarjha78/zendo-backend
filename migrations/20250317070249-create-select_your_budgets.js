'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('select_your_budgets', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    is_paid: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    budget_low: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
    },
    budget_image: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
    },
    product_alpha: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
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
  await queryInterface.dropTable('select_your_budgets');
}
