import User from './user.model.js';
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../configs/db.config.js';

class User_image_upload extends Model {}

User_image_upload.init(
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
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
  },
  {
    sequelize,
    modelName: 'User_image_upload',
    tableName: 'user_image_uploads',
    timestamps: true,
  }
);

export default User_image_upload;
