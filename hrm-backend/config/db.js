const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');
require('dotenv').config();

const dbName = process.env.DB_NAME || 'hrm_db';
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || '';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || 3306;

// Function to create database if it doesn't exist
const ensureDatabaseExists = async () => {
  try {
    // Connect to MySQL without selecting a database
    const connectionConfig = {
      host: dbHost,
      port: dbPort,
      user: dbUser
    };
    // Only add password if it's not empty
    if (dbPassword && dbPassword.trim() !== '') {
      connectionConfig.password = dbPassword;
    }
    const connection = await mysql.createConnection(connectionConfig);

    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    await connection.end();
    return true;
  } catch (error) {
    console.error('❌ Error ensuring database exists:', error.message);
    return false;
  }
};

// Sequelize configuration
const sequelizeConfig = {
  host: dbHost,
  port: dbPort,
  dialect: 'mysql',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  define: {
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

// Only pass password if it's not empty, otherwise pass undefined
const sequelize = new Sequelize(
  dbName,
  dbUser,
  dbPassword && dbPassword.trim() !== '' ? dbPassword : undefined,
  sequelizeConfig
);

// Test connection with auto-create database
const testConnection = async () => {
  try {
    // First ensure database exists
    const dbExists = await ensureDatabaseExists();
    if (!dbExists) {
      console.error('❌ Failed to create/verify database');
      return false;
    }

    // Then test connection
    await sequelize.authenticate();
    console.log('✅ MySQL connection established successfully.');
    console.log(`📊 Connected to database: ${dbName}`);
    return true;
  } catch (error) {
    console.error('❌ Unable to connect to MySQL database:', error.message);
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Make sure MySQL (XAMPP) is running');
    console.error('   2. Check database credentials in .env file');
    console.error('   3. Verify MySQL user has proper privileges');
    return false;
  }
};

module.exports = { sequelize, testConnection, ensureDatabaseExists };

