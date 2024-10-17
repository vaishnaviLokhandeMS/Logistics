const express = require('express');
const authRoutes = require('./authRoutes');
const router = express.Router();

router.use('/auth', authRoutes);
// Add other routes later (bookingRoutes, driverRoutes, etc.)

module.exports = router;
