const { Recruitment, Applicant, User } = require('../models');
const { Op } = require('sequelize');

// Create job posting
exports.createJob = async (req, res) => {
  try {
    const job = await Recruitment.create({
      ...req.body,
      posted_by: req.user.id,
      posted_date: new Date().toISOString().split('T')[0]
    });

    res.status(201).json({ message: 'Job posting created successfully', job });
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get job postings
exports.getJobs = async (req, res) => {
  try {
    const { status, department } = req.query;
    const where = {};

    if (status) where.status = status;
    if (department) where.department = department;

    const jobs = await Recruitment.findAll({
      where,
      include: [{ model: User, as: 'poster', attributes: ['id', 'email'] }],
      order: [['created_at', 'DESC']]
    });

    res.json({ jobs });
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Apply for job
exports.applyForJob = async (req, res) => {
  try {
    const { recruitment_id } = req.params;
    const { first_name, last_name, email, phone, cover_letter } = req.body;

    const applicant = await Applicant.create({
      recruitment_id,
      first_name,
      last_name,
      email,
      phone,
      cover_letter,
      status: 'applied'
    });

    res.status(201).json({ message: 'Application submitted successfully', applicant });
  } catch (error) {
    console.error('Apply for job error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get applicants
exports.getApplicants = async (req, res) => {
  try {
    const { recruitment_id, status } = req.query;
    const where = {};

    if (recruitment_id) where.recruitment_id = recruitment_id;
    if (status) where.status = status;

    const applicants = await Applicant.findAll({
      where,
      include: [{ model: Recruitment, as: 'job', attributes: ['id', 'job_title', 'department'] }],
      order: [['created_at', 'DESC']]
    });

    res.json({ applicants });
  } catch (error) {
    console.error('Get applicants error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update applicant status
exports.updateApplicantStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, interview_date, interview_notes } = req.body;

    const applicant = await Applicant.findByPk(id);
    if (!applicant) {
      return res.status(404).json({ message: 'Applicant not found' });
    }

    await applicant.update({
      status,
      interview_date,
      interview_notes
    });

    res.json({ message: 'Applicant status updated successfully', applicant });
  } catch (error) {
    console.error('Update applicant status error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

