const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const {
  createJob,
  getJobs,
  applyForJob,
  getApplicants,
  updateApplicantStatus
} = require('../controllers/recruitmentController');

router.post('/', authMiddleware, roleMiddleware('admin', 'manager'), createJob);
router.get('/', getJobs); // Public endpoint for viewing jobs
router.post('/:recruitment_id/apply', applyForJob); // Public endpoint for applying
router.get('/applicants', authMiddleware, roleMiddleware('admin', 'manager'), getApplicants);
router.put('/applicants/:id/status', authMiddleware, roleMiddleware('admin', 'manager'), updateApplicantStatus);

module.exports = router;

