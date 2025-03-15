'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('notifications', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // Ensure this matches the actual name of your users table
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    message: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    notification_image_url: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: '',
    },
    notification_date: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
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
  await queryInterface.dropTable('notifications');
}
