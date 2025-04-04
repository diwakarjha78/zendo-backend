'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('admin_notifications', 'is_read', {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn('admin_notifications', 'is_read');
}
