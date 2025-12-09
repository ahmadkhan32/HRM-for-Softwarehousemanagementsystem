const { Performance, Employee, User } = require('../models');
const { Op } = require('sequelize');

// Create performance review
exports.createPerformance = async (req, res) => {
  try {
    const { employee_id, review_period, rating, kpi_score, feedback, strengths, areas_for_improvement, goals } = req.body;

    const performance = await Performance.create({
      employee_id,
      review_period,
      reviewed_by: req.user.id,
      rating,
      kpi_score,
      feedback,
      strengths,
      areas_for_improvement,
      goals
    });

    res.status(201).json({ message: 'Performance review created successfully', performance });
  } catch (error) {
    console.error('Create performance error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get performance reviews
exports.getPerformances = async (req, res) => {
  try {
    const { employee_id } = req.query;
    const where = {};

    if (employee_id) where.employee_id = employee_id;

    const performances = await Performance.findAll({
      where,
      include: [
        { model: Employee, as: 'employee', attributes: ['id', 'first_name', 'last_name', 'employee_id'] },
        { model: User, as: 'reviewer', attributes: ['id', 'email'] }
      ],
      order: [['created_at', 'DESC']]
    });

    res.json({ performances });
  } catch (error) {
    console.error('Get performances error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update performance review
exports.updatePerformance = async (req, res) => {
  try {
    const { id } = req.params;
    const performance = await Performance.findByPk(id);

    if (!performance) {
      return res.status(404).json({ message: 'Performance review not found' });
    }

    await performance.update(req.body);
    res.json({ message: 'Performance review updated successfully', performance });
  } catch (error) {
    console.error('Update performance error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

