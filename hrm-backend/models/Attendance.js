const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Attendance = sequelize.define('Attendance', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  employee_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'employees',
      key: 'id'
    }
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  check_in: {
    type: DataTypes.DATE,
    allowNull: true
  },
  check_out: {
    type: DataTypes.DATE,
    allowNull: true
  },
  hours_worked: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
    defaultValue: 0.00
  },
  status: {
    type: DataTypes.ENUM('present', 'absent', 'late', 'half_day'),
    defaultValue: 'present'
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'attendance',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  underscored: false
});

module.exports = Attendance;

