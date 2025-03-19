import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../configs/db.config.js';

class Swipe_preference_image extends Model {}

Swipe_preference_image.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Swipe_preference_image',
    tableName: 'swipe_preference_images',
    timestamps: true,
  }
);

export default Swipe_preference_image;
