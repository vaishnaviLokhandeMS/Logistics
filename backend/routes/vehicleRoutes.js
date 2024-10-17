const express = require('express');
const router = express.Router();
const { getVehicleDemandData } = require('../controllers/vechicleDemandEntry'); // Adjust the path as necessary

// Route to fetch vehicle demand data
router.get('/vehicle-demand', getVehicleDemandData);

module.exports = router;
