import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../configs/db.config.js';

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    provider: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'local',
    },
    fcm_token: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    refresh_token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'user',
    timestamps: true,
  }
);

export default User;
