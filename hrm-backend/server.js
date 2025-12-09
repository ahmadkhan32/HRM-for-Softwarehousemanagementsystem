const express = require('express');
const cors = require('cors');
const path = require('path');
const { sequelize, testConnection } = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import routes
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const payrollRoutes = require('./routes/payrollRoutes');
const performanceRoutes = require('./routes/performanceRoutes');
const recruitmentRoutes = require('./routes/recruitmentRoutes');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/payroll', payrollRoutes);
app.use('/api/performance', performanceRoutes);
app.use('/api/recruitment', recruitmentRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'HRM Server is running' });
});

// Database connection and server start
let PORT = process.env.PORT || 5000;
if (process.env.PORT) {
  const parsedPort = parseInt(process.env.PORT, 10);
  if (!isNaN(parsedPort) && parsedPort > 0 && parsedPort < 65536) {
    PORT = parsedPort;
  } else {
    console.warn(`⚠️  Invalid PORT value "${process.env.PORT}", using default port 5000`);
  }
}

// Initialize database and start server
const startServer = async () => {
  try {
    // Test and ensure database exists
    const connected = await testConnection();
    if (!connected) {
      console.error('❌ Failed to connect to database. Please check your MySQL connection.');
      process.exit(1);
    }

    // Sync database models
    await sequelize.sync({ alter: false });
    console.log('✅ Database models synchronized');

    // Start server
    const server = app.listen(PORT, () => {
      console.log(`🚀 HRM Server running on port ${PORT}`);
      console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🌐 API: http://localhost:${PORT}/api`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use.`);
        console.log(`💡 Try one of these solutions:`);
        console.log(`   1. Kill the process using port ${PORT}`);
        console.log(`   2. Change PORT in your .env file to a different port`);
        process.exit(1);
      } else {
        throw err;
      }
    });
  } catch (err) {
    console.error('❌ Server startup error:', err);
    process.exit(1);
  }
};

// Start the server
startServer();

module.exports = app;

