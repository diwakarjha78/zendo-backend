import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../configs/db.config.js';

class Rendering_image extends Model {}

Rendering_image.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    ai_image: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: '',
    },
    furniture_data: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: '',
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Rendering_image',
    tableName: 'rendering_images',
    timestamps: true,
  }
);

export default Rendering_image;
