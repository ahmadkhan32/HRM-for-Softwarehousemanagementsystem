const mysql = require('mysql2/promise');
require('dotenv').config();

const createDatabase = async () => {
  const dbName = process.env.DB_NAME || 'hrm_db';
  const dbUser = process.env.DB_USER || 'root';
  const dbPassword = process.env.DB_PASSWORD || '';
  const dbHost = process.env.DB_HOST || 'localhost';
  const dbPort = process.env.DB_PORT || 3306;

  try {
    // Connect to MySQL without selecting a database
    const connection = await mysql.createConnection({
      host: dbHost,
      port: dbPort,
      user: dbUser,
      password: dbPassword
    });

    console.log('✅ Connected to MySQL server');

    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    console.log(`✅ Database '${dbName}' created or already exists`);

    await connection.end();
    console.log('✅ Database setup complete!');
    return true;
  } catch (error) {
    console.error('❌ Error creating database:', error.message);
    console.error('\n💡 Make sure:');
    console.error('   1. MySQL (XAMPP) is running');
    console.error('   2. Database credentials in .env are correct');
    console.error('   3. MySQL user has CREATE DATABASE privileges');
    return false;
  }
};

// Run if called directly
if (require.main === module) {
  createDatabase()
    .then((success) => {
      process.exit(success ? 0 : 1);
    })
    .catch((error) => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

module.exports = createDatabase;

