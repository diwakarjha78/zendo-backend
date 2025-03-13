import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../configs/db.config.js';

class About_us extends Model {}

About_us.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    about_us: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'About_us',
    tableName: 'about_us',
    timestamps: true,
  }
);

export default About_us;
