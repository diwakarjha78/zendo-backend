import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../configs/db.config.js';
import User from './user.model.js';
import Budget_estimation from './budget_estimation.model.js';

class User_budget_estimation extends Model {}

User_budget_estimation.init(
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
        model: Budget_estimation,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User_budget_estimation',
    tableName: 'user_budget_estimations',
    timestamps: true,
  }
);

export default User_budget_estimation;
