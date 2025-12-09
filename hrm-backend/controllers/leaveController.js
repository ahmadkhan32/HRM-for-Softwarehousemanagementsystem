const { Leave, Employee, User } = require('../models');
const { Op } = require('sequelize');

// Create leave request
exports.createLeave = async (req, res) => {
  try {
    const employee = await Employee.findOne({ where: { user_id: req.user.id } });
    if (!employee) {
      return res.status(404).json({ message: 'Employee record not found' });
    }

    const { leave_type, start_date, end_date, reason } = req.body;
    
    const start = new Date(start_date);
    const end = new Date(end_date);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

    const leave = await Leave.create({
      employee_id: employee.id,
      leave_type,
      start_date,
      end_date,
      days,
      reason,
      status: 'pending'
    });

    res.status(201).json({ message: 'Leave request created successfully', leave });
  } catch (error) {
    console.error('Create leave error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get leave requests
exports.getLeaves = async (req, res) => {
  try {
    const { employee_id, status } = req.query;
    const where = {};

    if (req.user.role === 'employee') {
      const employee = await Employee.findOne({ where: { user_id: req.user.id } });
      if (employee) {
        where.employee_id = employee.id;
      }
    } else if (employee_id) {
      where.employee_id = employee_id;
    }

    if (status) where.status = status;

    const leaves = await Leave.findAll({
      where,
      include: [
        { model: Employee, as: 'employee', attributes: ['id', 'first_name', 'last_name', 'employee_id'] },
        { model: User, as: 'approver', attributes: ['id', 'email'] }
      ],
      order: [['created_at', 'DESC']]
    });

    res.json({ leaves });
  } catch (error) {
    console.error('Get leaves error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Approve/Reject leave
exports.updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, rejection_reason } = req.body;

    const leave = await Leave.findByPk(id);
    if (!leave) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    await leave.update({
      status,
      approved_by: req.user.id,
      approved_at: status === 'approved' ? new Date() : null,
      rejection_reason: status === 'rejected' ? rejection_reason : null
    });

    res.json({ message: `Leave request ${status} successfully`, leave });
  } catch (error) {
    console.error('Update leave status error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

