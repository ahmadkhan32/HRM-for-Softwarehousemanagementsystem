const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Recruitment = sequelize.define('Recruitment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  job_title: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  department: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  requirements: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  posted_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.ENUM('open', 'closed', 'filled'),
    defaultValue: 'open'
  },
  posted_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  closing_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  }
}, {
  tableName: 'recruitment',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  underscored: false
});

module.exports = Recruitment;

