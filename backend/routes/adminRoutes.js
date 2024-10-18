const express = require('express');
const { loginAdmin } = require('../controllers/adminController');
const { getDriverSuggestions, getDriverById, getTotalBookings, getTotalDelivered } = require('../controllers/fetchAdminData');
const router = express.Router();

router.post('/login', loginAdmin);  // Admin login route

// Route to get driver suggestions
router.get('/driver-suggestions', getDriverSuggestions);

// Route to get a single driver by driver ID
router.get('/driver/:driverId', getDriverById);

router.get('/total-bookings', getTotalBookings);

router.get('/total-delivered', getTotalDelivered);

module.exports = router;
