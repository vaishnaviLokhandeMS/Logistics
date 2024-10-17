const VehicleDemand = require('../models/vehicleDemandModel'); // Ensure the path is correct

// Controller to fetch vehicle demand data
exports.getVehicleDemandData = async (req, res) => {
  try {
    // Fetch all records from the vehicle_demand collection
    const vehicleDemands = await VehicleDemand.find({}); // Fetch all documents
    res.status(200).json(vehicleDemands); // Return data with status 200
  } catch (error) {
    console.error('Error fetching vehicle demand data:', error);
    res.status(500).json({ message: 'Server error while fetching vehicle demand data' }); // Handle server errors
  }
};


