import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../configs/db.config.js';

class Select_your_style extends Model {}

Select_your_style.init(
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
    model: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    product_alpha: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    product_image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
  },
  {
    sequelize,
    modelName: 'Select_your_style',
    tableName: 'select_your_styles',
    timestamps: true,
  }
);

export default Select_your_style;
