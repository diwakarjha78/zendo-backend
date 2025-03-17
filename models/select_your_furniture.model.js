import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../configs/db.config.js';

class Select_your_furniture extends Model {}

Select_your_furniture.init(
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
    package_name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    product_alpha: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    package_url: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
  },
  {
    sequelize,
    modelName: 'Select_your_furniture',
    tableName: 'select_your_furnitures',
    timestamps: true,
  }
);

export default Select_your_furniture;
