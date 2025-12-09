const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { createPerformance, getPerformances, updatePerformance } = require('../controllers/performanceController');

router.use(authMiddleware);

router.post('/', roleMiddleware('admin', 'manager'), createPerformance);
router.get('/', roleMiddleware('admin', 'manager', 'employee'), getPerformances);
router.put('/:id', roleMiddleware('admin', 'manager'), updatePerformance);

module.exports = router;

