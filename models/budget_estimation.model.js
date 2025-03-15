import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../configs/db.config.js';

class Budget_estimation extends Model {}

Budget_estimation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    pricelist: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        notEmpty: true,
        isArray(value) {
          if (!Array.isArray(value)) {
            throw new Error('Pricelist must be an array');
          }
          if (!value.every((item) => typeof item === 'string')) {
            throw new Error('Pricelist must contain only strings');
          }
        },
      },
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    modelName: 'Budget_estimation',
    tableName: 'budget_estimations',
    timestamps: true,
  }
);

export default Budget_estimation;
