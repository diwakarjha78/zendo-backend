import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../configs/db.config.js';

class Device_count extends Model {}

Device_count.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    device_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    ai_images: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    furniture_data: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Device_count',
    tableName: 'device_counts',
    timestamps: true,
  }
);

export default Device_count;
