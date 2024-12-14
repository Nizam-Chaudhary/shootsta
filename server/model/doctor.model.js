
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

// Define the Doctor model
const Doctor = sequelize.define('Doctor', {
  name: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  speciality: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'doctors',
  timestamps: false, // Disable automatic timestamps (createdAt/updatedAt)
});
 
export default Doctor;
