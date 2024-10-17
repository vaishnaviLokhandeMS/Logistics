// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Define the booking route
router.post('/book', bookingController.bookVehicle);
router.get('/track/:bookingId', bookingController.trackTransportation);

module.exports = router;
