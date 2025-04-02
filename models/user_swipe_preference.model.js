import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../configs/db.config.js';
import SwipePreferenceImage from './swipe_preference_image.model.js';
import User from './user.model.js';

class User_swipe_preference extends Model {}

User_swipe_preference.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    image_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: SwipePreferenceImage,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    liked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User_swipe_preference',
    tableName: 'user_swipe_preferences',
    timestamps: true,
  }
);

export default User_swipe_preference;
