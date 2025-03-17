import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../configs/db.config.js';

class Select_your_room extends Model {}

Select_your_room.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    is_paid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    selectroom: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    product_alpha: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    room_image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
  },
  {
    sequelize,
    modelName: 'Select_your_room',
    tableName: 'select_your_rooms',
    timestamps: true,
  }
);

export default Select_your_room;
