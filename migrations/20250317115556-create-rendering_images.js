'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('rendering_images', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    ai_image: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: '',
    },
    furniture_data: {
      type: Sequelize.TEXT,
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
  await queryInterface.dropTable('rendering_images');
}
