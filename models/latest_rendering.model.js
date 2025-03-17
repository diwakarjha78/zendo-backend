import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../configs/db.config.js';

class Latest_rendering extends Model {}

Latest_rendering.init(
  {
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
  },
  {
    sequelize,
    modelName: 'Latest_rendering',
    tableName: 'latest_renderings',
    timestamps: true,
  }
);

export default Latest_rendering;
