const { Attendance, Employee } = require('../models');
const { Op } = require('sequelize');

// Check in
exports.checkIn = async (req, res) => {
  try {
    const employee = await Employee.findOne({ where: { user_id: req.user.id } });
    if (!employee) {
      return res.status(404).json({ message: 'Employee record not found' });
    }

    const today = new Date().toISOString().split('T')[0];
    const existing = await Attendance.findOne({
      where: {
        employee_id: employee.id,
        date: today
      }
    });

    if (existing && existing.check_in) {
      return res.status(400).json({ message: 'Already checked in today' });
    }

    const attendance = existing || await Attendance.create({
      employee_id: employee.id,
      date: today,
      check_in: new Date(),
      status: 'present'
    });

    if (!existing) {
      await attendance.update({ check_in: new Date() });
    }

    res.json({ message: 'Checked in successfully', attendance });
  } catch (error) {
    console.error('Check in error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Check out
exports.checkOut = async (req, res) => {
  try {
    const employee = await Employee.findOne({ where: { user_id: req.user.id } });
    if (!employee) {
      return res.status(404).json({ message: 'Employee record not found' });
    }

    const today = new Date().toISOString().split('T')[0];
    const attendance = await Attendance.findOne({
      where: {
        employee_id: employee.id,
        date: today
      }
    });

    if (!attendance || !attendance.check_in) {
      return res.status(400).json({ message: 'Please check in first' });
    }

    if (attendance.check_out) {
      return res.status(400).json({ message: 'Already checked out today' });
    }

    const checkOutTime = new Date();
    const checkInTime = new Date(attendance.check_in);
    const hoursWorked = (checkOutTime - checkInTime) / (1000 * 60 * 60);

    await attendance.update({
      check_out: checkOutTime,
      hours_worked: hoursWorked.toFixed(2)
    });

    res.json({ message: 'Checked out successfully', attendance });
  } catch (error) {
    console.error('Check out error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get attendance records
exports.getAttendance = async (req, res) => {
  try {
    const { employee_id, start_date, end_date } = req.query;
    const where = {};

    if (req.user.role === 'employee') {
      const employee = await Employee.findOne({ where: { user_id: req.user.id } });
      if (employee) {
        where.employee_id = employee.id;
      }
    } else if (employee_id) {
      where.employee_id = employee_id;
    }

    if (start_date && end_date) {
      where.date = {
        [Op.between]: [start_date, end_date]
      };
    }

    const attendance = await Attendance.findAll({
      where,
      include: [{ model: Employee, as: 'employee', attributes: ['id', 'first_name', 'last_name', 'employee_id'] }],
      order: [['date', 'DESC']]
    });

    res.json({ attendance });
  } catch (error) {
    console.error('Get attendance error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

