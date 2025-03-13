import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../configs/db.config.js';

class Contact_details extends Model {}

Contact_details.init(
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
        notEmpty: true, // equivalent to required: true in Mongoose
        isEmail: true, // Ensures the value is a valid email
      },
    },
    email_image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true, // Ensure the value is a valid URL if provided
      },
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, // equivalent to required: true in Mongoose
        isNumeric: true, // Ensures the value is numeric
      },
    },
    mobile_image_url: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true, // Ensure the value is a valid URL if provided
      },
    },
  },
  {
    sequelize,
    modelName: 'Contact_details',
    tableName: 'contact_details',
    timestamps: true,
  }
);

export default Contact_details;
