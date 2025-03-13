import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../configs/db.config.js';

class Verification_otp extends Model {}

Verification_otp.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    otp: {
      type: DataTypes.STRING(6),
      allowNull: false,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Verification_otp',
    tableName: 'verification_otp',
    timestamps: true,
  }
);

export default Verification_otp;
