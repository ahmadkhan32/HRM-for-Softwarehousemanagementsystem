const { User, Employee } = require('../models');
const { generateToken } = require('../config/auth');
const { sequelize } = require('../config/db');

// Register
exports.register = async (req, res) => {
  try {
    const { email, password, role, employeeData } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create user
    const user = await User.create({
      email,
      password,
      role: role || 'employee'
    });

    // Create employee record if employeeData provided
    if (employeeData && user.role === 'employee') {
      await Employee.create({
        user_id: user.id,
        employee_id: employeeData.employee_id,
        first_name: employeeData.first_name,
        last_name: employeeData.last_name,
        phone: employeeData.phone,
        department: employeeData.department,
        position: employeeData.position,
        joining_date: employeeData.joining_date,
        salary: employeeData.salary
      });
    }

    const token = generateToken(user.id);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const trimmedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      where: sequelize.where(
        sequelize.fn('LOWER', sequelize.col('email')),
        trimmedEmail
      )
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.is_active) {
      return res.status(401).json({ message: 'Account is deactivated' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user.id);

    // Get employee data if exists
    const employee = await Employee.findOne({ where: { user_id: user.id } });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        employee: employee ? {
          id: employee.id,
          employee_id: employee.employee_id,
          first_name: employee.first_name,
          last_name: employee.last_name,
          department: employee.department,
          position: employee.position
        } : null
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get current user
exports.getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Employee, as: 'employee' }]
    });

    res.json({ user });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

