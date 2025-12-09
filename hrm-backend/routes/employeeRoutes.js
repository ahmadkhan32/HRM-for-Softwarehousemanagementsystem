const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const {
  getAllEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeStats,
  getMyProfile,
  updateMyProfile
} = require('../controllers/employeeController');

router.use(authMiddleware);

router.get('/', roleMiddleware('admin', 'manager'), getAllEmployees);
router.get('/me', getMyProfile);
router.put('/me', updateMyProfile);
router.get('/:id', roleMiddleware('admin', 'manager', 'employee'), getEmployee);
router.get('/:id/stats', roleMiddleware('admin', 'manager', 'employee'), getEmployeeStats);
router.post('/', roleMiddleware('admin'), createEmployee);
router.put('/:id', roleMiddleware('admin'), updateEmployee);
router.delete('/:id', roleMiddleware('admin'), deleteEmployee);

module.exports = router;

