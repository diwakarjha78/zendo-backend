'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('users', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    mobile: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    googleId: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    },
    provider: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'local',
    },
    fcm_token: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
    },
    token: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    refresh_token: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    image_url: {
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
  await queryInterface.dropTable('usesr');
}
