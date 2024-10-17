const express = require('express');
const { loginDriver, getPendingBookings, acceptBooking, getActiveBookings, updateJobStatus, getCompletedBookings } = require('../controllers/driverController');
const { verifyDriverToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Route for driver login
router.post('/login', loginDriver);

// Route to get all pending bookings
router.get('/pending-bookings', getPendingBookings);

// Route to accept a booking (with driverId)
router.post('/accept-booking', acceptBooking);

// Route to get all active bookings for the driver
router.get('/active-bookings/:driverId', getActiveBookings);  // New route to fetch active bookings

router.post('/update-status', updateJobStatus);

router.get('/completed-bookings/:driverId', getCompletedBookings);

module.exports = router;
