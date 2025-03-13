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
      type: DataTypes.STRING,
      allowNull: false,
    },
    furniture_data: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Device_count',
    tableName: 'device_count',
    timestamps: true,
  }
);

export default Device_count;
