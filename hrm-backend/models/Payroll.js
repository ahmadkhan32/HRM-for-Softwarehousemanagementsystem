const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Payroll = sequelize.define('Payroll', {
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
  month: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 12
    }
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  base_salary: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  allowances: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  bonuses: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  overtime: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  deductions: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  tax: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  net_salary: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'processed', 'paid'),
    defaultValue: 'pending'
  },
  payment_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  }
}, {
  tableName: 'payroll',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  underscored: false
});

module.exports = Payroll;

