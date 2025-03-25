import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../configs/db.config.js';
import Subscription from './Subscription.js';

class Subscription_data extends Model {}

Subscription_data.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subscription_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Subscription,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    modelName: 'Subscription_data',
    tableName: 'subscription_datas',
    timestamps: true,
  }
);

export default Subscription_data;
