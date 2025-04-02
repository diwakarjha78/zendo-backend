'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('user_swipe_preferences', {
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
        model: 'users', // name of the referenced table
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    image_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'swipe_preference_images', // name of the referenced table
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    liked: {
      type: Sequelize.BOOLEAN,
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
  await queryInterface.dropTable('user_swipe_preferences');
}
