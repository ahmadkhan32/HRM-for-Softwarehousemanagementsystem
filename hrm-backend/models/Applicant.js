const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Applicant = sequelize.define('Applicant', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  recruitment_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'recruitment',
      key: 'id'
    }
  },
  first_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  resume_path: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  cover_letter: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('applied', 'shortlisted', 'interviewed', 'rejected', 'hired'),
    defaultValue: 'applied'
  },
  interview_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  interview_notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'applicants',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  underscored: false
});

module.exports = Applicant;

