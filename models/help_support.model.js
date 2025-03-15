import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../configs/db.config.js';

class Help_support extends Model {}

Help_support.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Help_support',
    tableName: 'help_supports',
    timestamps: true,
  }
);

export default Help_support;
