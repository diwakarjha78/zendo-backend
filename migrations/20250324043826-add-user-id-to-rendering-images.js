'use strict';

export async function up(queryInterface, Sequelize) {
  // Add a new column "user_id" to "rendering_images"
  await queryInterface.addColumn('rendering_images', 'user_id', {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'users',   // name of your "users" table
      key: 'id',        // primary key in "users" table
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });
}

export async function down(queryInterface, Sequelize) {
  // Remove the "user_id" column
  await queryInterface.removeColumn('rendering_images', 'user_id');
}
