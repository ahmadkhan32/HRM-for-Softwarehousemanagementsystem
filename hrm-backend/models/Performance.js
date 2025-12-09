const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Performance = sequelize.define('Performance', {
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
  review_period: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: 'e.g., Q1-2024, Annual-2024'
  },
  reviewed_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    },
    comment: 'Rating from 1 to 5'
  },
  kpi_score: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
    comment: 'KPI score out of 100'
  },
  feedback: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  strengths: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  areas_for_improvement: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  goals: {
    type: DataTypes.JSON,
    allowNull: true
  }
}, {
  tableName: 'performance',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  underscored: false
});

module.exports = Performance;

