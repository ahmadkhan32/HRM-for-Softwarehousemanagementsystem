const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { generatePayroll, getPayrolls, updatePayrollStatus } = require('../controllers/payrollController');

router.use(authMiddleware);

router.post('/', roleMiddleware('admin'), generatePayroll);
router.get('/', roleMiddleware('admin', 'manager', 'employee'), getPayrolls);
router.put('/:id/status', roleMiddleware('admin'), updatePayrollStatus);

module.exports = router;

