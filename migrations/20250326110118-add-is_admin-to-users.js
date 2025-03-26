'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('users', 'is_admin', {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn('users', 'is_admin');
}
