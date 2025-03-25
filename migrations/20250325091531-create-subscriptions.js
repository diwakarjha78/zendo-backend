'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('subscriptions', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
    },
    text: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: '',
    },
    trial_day: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW'),
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW'),
    },
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('subscriptions');
}
