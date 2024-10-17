const express = require('express');
const { loginAdmin } = require('../controllers/adminController');
const { getDriverSuggestions, getDriverById } = require('../controllers/fetchAdminData');
const router = express.Router();

router.post('/login', loginAdmin);  // Admin login route

// Route to get driver suggestions
router.get('/driver-suggestions', getDriverSuggestions);

// Route to get a single driver by driver ID
router.get('/driver/:driverId', getDriverById);

module.exports = router;
