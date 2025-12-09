const { Employee, User, Attendance, Leave, Payroll } = require('../models');
const { Op } = require('sequelize');

// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const { department, position, search } = req.query;
    const where = {};

    if (department) where.department = department;
    if (position) where.position = position;
    if (search) {
      where[Op.or] = [
        { first_name: { [Op.like]: `%${search}%` } },
        { last_name: { [Op.like]: `%${search}%` } },
        { employee_id: { [Op.like]: `%${search}%` } }
      ];
    }

    const employees = await Employee.findAll({
      where,
      include: [{ model: User, as: 'user', attributes: ['id', 'email', 'role', 'is_active'] }],
      order: [['created_at', 'DESC']]
    });

    res.json({ employees });
  } catch (error) {
    console.error('Get all employees error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single employee
exports.getEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByPk(id, {
      include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }]
    });

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({ employee });
  } catch (error) {
    console.error('Get employee error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create employee
exports.createEmployee = async (req, res) => {
  try {
    const { email, password, ...employeeData } = req.body;

    // Create user first
    const user = await User.create({
      email,
      password,
      role: 'employee'
    });

    // Generate employee ID
    const employeeId = `EMP-${String(Date.now()).slice(-6)}`;

    const employee = await Employee.create({
      user_id: user.id,
      employee_id: employeeId,
      ...employeeData
    });

    res.status(201).json({ message: 'Employee created successfully', employee });
  } catch (error) {
    console.error('Create employee error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update employee
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByPk(id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    await employee.update(req.body);
    res.json({ message: 'Employee updated successfully', employee });
  } catch (error) {
    console.error('Update employee error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get my profile (employee's own profile)
exports.getMyProfile = async (req, res) => {
  try {
    const employee = await Employee.findOne({
      where: { user_id: req.user.id },
      include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }]
    });

    if (!employee) {
      return res.status(404).json({ message: 'Employee profile not found' });
    }

    res.json({ employee });
  } catch (error) {
    console.error('Get my profile error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update my profile (employee's own profile)
exports.updateMyProfile = async (req, res) => {
  try {
    const employee = await Employee.findOne({ where: { user_id: req.user.id } });

    if (!employee) {
      return res.status(404).json({ message: 'Employee profile not found' });
    }

    // Only allow updating certain fields
    const allowedFields = ['phone', 'address'];
    const updateData = {};
    
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    // Update email in User table if provided
    if (req.body.email) {
      await User.update({ email: req.body.email }, { where: { id: req.user.id } });
    }

    await employee.update(updateData);
    res.json({ message: 'Profile updated successfully', employee });
  } catch (error) {
    console.error('Update my profile error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete employee
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByPk(id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Delete user account
    await User.destroy({ where: { id: employee.user_id } });
    
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Delete employee error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get employee dashboard stats
exports.getEmployeeStats = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get attendance stats for current month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const attendanceCount = await Attendance.count({
      where: {
        employee_id: id,
        date: { [Op.gte]: startOfMonth }
      }
    });

    // Get pending leaves
    const pendingLeaves = await Leave.count({
      where: {
        employee_id: id,
        status: 'pending'
      }
    });

    // Get latest payroll
    const latestPayroll = await Payroll.findOne({
      where: { employee_id: id },
      order: [['created_at', 'DESC']]
    });

    res.json({
      attendanceCount,
      pendingLeaves,
      latestPayroll
    });
  } catch (error) {
    console.error('Get employee stats error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

