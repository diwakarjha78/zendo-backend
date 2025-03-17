'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('device_counts', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    device_id: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    ai_images: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    furniture_data: {
      type: Sequelize.TEXT,
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
  await queryInterface.dropTable('device_counts');
}
