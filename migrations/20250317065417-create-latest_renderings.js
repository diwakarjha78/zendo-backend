'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('latest_renderings', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    is_paid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modern: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    product_alpha: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    render_image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
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
  await queryInterface.dropTable('latest_renderings');
}
