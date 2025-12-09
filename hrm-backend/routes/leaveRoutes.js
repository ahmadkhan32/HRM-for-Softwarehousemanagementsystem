const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { createLeave, getLeaves, updateLeaveStatus } = require('../controllers/leaveController');

router.use(authMiddleware);

router.post('/', roleMiddleware('employee'), createLeave);
router.get('/', roleMiddleware('admin', 'manager', 'employee'), getLeaves);
router.put('/:id/status', roleMiddleware('admin', 'manager'), updateLeaveStatus);

module.exports = router;

