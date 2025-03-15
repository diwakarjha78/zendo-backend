'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('payments', {
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
        model: 'users', // Ensure this matches the actual name of your users table
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    txn_id: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    amount: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    payment_method: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    order_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
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
  await queryInterface.dropTable('payments');
}
