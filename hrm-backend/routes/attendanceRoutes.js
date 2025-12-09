const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { checkIn, checkOut, getAttendance } = require('../controllers/attendanceController');

router.use(authMiddleware);

router.post('/checkin', roleMiddleware('employee'), checkIn);
router.post('/checkout', roleMiddleware('employee'), checkOut);
router.get('/', roleMiddleware('admin', 'manager', 'employee'), getAttendance);

module.exports = router;

