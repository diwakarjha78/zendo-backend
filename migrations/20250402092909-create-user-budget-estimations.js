'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('user_budget_estimations', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // Matches the table name for User model
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    image_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'budget_estimations', // Matches the table name for Budget_estimation model
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    status: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    },
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('user_budget_estimations');
}
