'use strict';

export async function up(queryInterface, Sequelize) {
  // Rename column "googleId" to "providerid" in the "users" table
  await queryInterface.renameColumn('users', 'googleId', 'provider_id');
}

export async function down(queryInterface, Sequelize) {
  // Revert the change: rename "providerid" back to "googleId"
  await queryInterface.renameColumn('users', 'provider_id', 'googleId');
}
