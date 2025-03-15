import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../configs/db.config.js';
import User from './user.model.js';

class Contact_us extends Model {}

Contact_us.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      // Foreign key linking to User model
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: '',
    },
  },
  {
    sequelize,
    modelName: 'Contact_us',
    tableName: 'contact_uss',
    timestamps: true,
  }
);

// Define Relationship
User.hasMany(Contact_us, { foreignKey: 'userId' });
Contact_us.belongsTo(User, { foreignKey: 'userId' });

export default Contact_us;
