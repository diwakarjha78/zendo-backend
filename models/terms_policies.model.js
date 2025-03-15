import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../configs/db.config.js';

class Terms_policies extends Model {}

Terms_policies.init(
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
    modelName: 'Terms_policies',
    tableName: 'terms_policiess',
    timestamps: true,
  }
);

export default Terms_policies;
