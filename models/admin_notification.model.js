import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../configs/db.config.js';

class Admin_notification extends Model {}

Admin_notification.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Admin_notification',
    tableName: 'admin_notifications',
    timestamps: true,
  }
);

export default Admin_notification;
