import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../configs/db.config.js';

class Select_your_budget extends Model {}

Select_your_budget.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    is_paid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    budget_low: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    budget_image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    product_alpha: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
  },
  {
    sequelize,
    modelName: 'Select_your_budget',
    tableName: 'select_your_budgets',
    timestamps: true,
  }
);

export default Select_your_budget;
