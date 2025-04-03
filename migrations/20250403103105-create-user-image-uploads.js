'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('user_image_uploads', {
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
        // Ensure this matches your users table name
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
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
  await queryInterface.dropTable('user_image_uploads');
}
