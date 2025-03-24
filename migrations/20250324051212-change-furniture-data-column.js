'use strict';

export async function up(queryInterface, Sequelize) {
  // Change the "furniture_data" column type to LONGTEXT
  await queryInterface.changeColumn('device_counts', 'furniture_data', {
    type: Sequelize.TEXT('long'),
    allowNull: false,
  });
}

export async function down(queryInterface, Sequelize) {
  // Revert the "furniture_data" column type back to TEXT
  await queryInterface.changeColumn('device_counts', 'furniture_data', {
    type: Sequelize.TEXT,
    allowNull: false,
  });
}
