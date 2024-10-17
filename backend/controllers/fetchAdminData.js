const Driver = require('../models/driverModel');

// Fetch driver suggestions based on name or driver_id prefix
exports.getDriverSuggestions = async (req, res) => {
  const { search } = req.query;

  if (!search) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  try {
    // Search by prefix match for driver name or driver_id
    const drivers = await Driver.find({
      $or: [
        { fullName: { $regex: search, $options: 'i' } },  // Case insensitive search for name
        { driver_id: { $regex: search, $options: 'i' } }  // Case insensitive search for driver_id
      ]
    }).limit(10); // Limit suggestions to 10 results

    res.status(200).json(drivers);
  } catch (error) {
    console.error('Error fetching driver suggestions:', error);
    res.status(500).json({ error: 'Server error while fetching driver suggestions' });
  }
};

// Fetch driver details by driver ID
exports.getDriverById = async (req, res) => {
  const { driverId } = req.params;

  try {
    const driver = await Driver.findOne({ driver_id: driverId });
    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }
    res.status(200).json(driver);
  } catch (error) {
    console.error('Error fetching driver details:', error);
    res.status(500).json({ error: 'Server error while fetching driver details' });
  }
};
