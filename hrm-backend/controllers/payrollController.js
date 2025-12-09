const { Payroll, Employee } = require('../models');
const { Op } = require('sequelize');

// Generate payroll
exports.generatePayroll = async (req, res) => {
  try {
    const { employee_id, month, year } = req.body;

    const employee = await Employee.findByPk(employee_id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Check if payroll already exists
    const existing = await Payroll.findOne({
      where: { employee_id, month, year }
    });

    if (existing) {
      return res.status(400).json({ message: 'Payroll already generated for this period' });
    }

    const baseSalary = parseFloat(employee.salary) || 0;
    const allowances = parseFloat(req.body.allowances) || 0;
    const bonuses = parseFloat(req.body.bonuses) || 0;
    const overtime = parseFloat(req.body.overtime) || 0;
    const deductions = parseFloat(req.body.deductions) || 0;
    
    // Simple tax calculation (10% of gross)
    const gross = baseSalary + allowances + bonuses + overtime;
    const tax = gross * 0.1;
    const netSalary = gross - tax - deductions;

    const payroll = await Payroll.create({
      employee_id,
      month: parseInt(month),
      year: parseInt(year),
      base_salary: baseSalary,
      allowances,
      bonuses,
      overtime,
      deductions,
      tax,
      net_salary: netSalary,
      status: 'pending'
    });

    res.status(201).json({ message: 'Payroll generated successfully', payroll });
  } catch (error) {
    console.error('Generate payroll error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get payroll records
exports.getPayrolls = async (req, res) => {
  try {
    const { employee_id, month, year } = req.query;
    const where = {};

    if (employee_id) where.employee_id = employee_id;
    if (month) where.month = month;
    if (year) where.year = year;

    const payrolls = await Payroll.findAll({
      where,
      include: [{ model: Employee, as: 'employee', attributes: ['id', 'first_name', 'last_name', 'employee_id'] }],
      order: [['year', 'DESC'], ['month', 'DESC']]
    });

    res.json({ payrolls });
  } catch (error) {
    console.error('Get payrolls error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update payroll status
exports.updatePayrollStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, payment_date } = req.body;

    const payroll = await Payroll.findByPk(id);
    if (!payroll) {
      return res.status(404).json({ message: 'Payroll not found' });
    }

    await payroll.update({
      status,
      payment_date: status === 'paid' ? payment_date : null
    });

    res.json({ message: 'Payroll status updated successfully', payroll });
  } catch (error) {
    console.error('Update payroll status error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

