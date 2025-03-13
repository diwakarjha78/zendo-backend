import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../configs/db.config.js';

class Privacy_policy extends Model {}

Privacy_policy.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Privacy_policy',
    tableName: 'privacy_policy',
    timestamps: true,
  }
);

export default Privacy_policy;
