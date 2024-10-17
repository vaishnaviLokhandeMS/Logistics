const axios = require('axios'); // Use axios for HTTP requests
const Booking = require('../models/bookingModel'); // MongoDB model for bookings
const Driver = require('../models/driverModel'); // MongoDB model for drivers
const VehicleDemand = require('../models/vehicleDemandModel'); // MongoDB model for vehicle demand
const { v4: uuidv4 } = require('uuid');  // Import UUID generator

// Function to calculate distance using Google Distance Matrix API
const calculateDistance = async (pickup, dropoff) => {
  try {
    const apiKey = process.env.GOOGLE_API_KEY; // Set your Google Maps API key
    const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${pickup}&destinations=${dropoff}&key=${apiKey}`;

    console.log(`Fetching distance between ${pickup} and ${dropoff}`);
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (data.status === 'OK' && data.rows[0].elements[0].status === 'OK') {
      const distanceValue = data.rows[0].elements[0].distance.value / 1000; // Convert to kilometers
      console.log(`Distance fetched: ${distanceValue} km`);
      return distanceValue;
    } else {
      throw new Error('Unable to calculate distance');
    }
  } catch (error) {
    console.error('Error calculating distance:', error);
    throw error;
  }
};

// Function to calculate cost based on vehicle type and current demand
const calculateCost = (distance, vehicleType, currentDemand) => {
  const baseRates = {
    small: 5,
    medium: 8,
    large: 12,
  };

  const baseCost = distance * baseRates[vehicleType];
  const demandMultiplier = currentDemand > 50 ? 1.5 : 1;
  const finalCost = baseCost * demandMultiplier;

  console.log(`Cost calculated: ${finalCost}`);
  return finalCost;
};

// Booking function to estimate price and store booking
exports.bookVehicle = async (req, res) => {
    const { pickupLocation, dropoffLocation, vehicleType } = req.body;
  
    console.log('Received booking request:', req.body);
  
    try {
      const userId = req.user ? req.user.id : uuidv4(); // Generate UUID if no authentication
  
      // 1. Calculate distance
      console.log('Calculating distance...');
      const distanceInKm = await calculateDistance(pickupLocation, dropoffLocation);
  
      // 2. Fetch current demand for the vehicle type
      console.log(`Fetching demand for vehicle type: ${vehicleType}`);
      const demandData = await VehicleDemand.findOne({ vehicle_type: vehicleType });
      const currentDemand = demandData ? demandData.current_demand : 0;
      console.log(`Current demand for ${vehicleType}: ${currentDemand}`);
  
      // 3. Calculate the price
      console.log('Calculating price...');
      const cost = calculateCost(distanceInKm, vehicleType, currentDemand);
  
      // 4. Store booking details in MongoDB
      console.log('Storing booking in MongoDB...');
      const booking = new Booking({
        booking_id: uuidv4(),
        user_id: userId,
        pickup_location: pickupLocation,
        dropoff_location: dropoffLocation,
        vehicle_type: vehicleType,
        distance: distanceInKm,
        cost,
        current_demand: currentDemand,
        driver_id: 'driver123', // Assume a driver is assigned, ideally fetched dynamically
        status: 'pending',
        created_at: new Date(),
      });
  
      await booking.save();
      console.log('Booking saved successfully:', booking);
  
      // 5. Respond with the calculated cost and distance
      console.log('Booking successful');
      res.status(201).json({ message: 'Booking successful', cost, distance: distanceInKm, vehicleType, booking_id: booking.booking_id });
    } catch (error) {
      console.error('Error processing booking:', error);
      res.status(500).json({ error: 'Error processing booking' });
    }
  };
  
// Track transportation function
exports.trackTransportation = async (req, res) => {
  const { bookingId } = req.params;

  try {
    // Fetch booking by booking ID
    const booking = await Booking.findOne({ booking_id: bookingId });
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Fetch driver location based on the driver ID in the booking
    const driver = await Driver.findOne({ driver_id: booking.driver_id });
    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    // Assuming driver's location is stored as { lat: ..., long: ... }
    const currentLocation = driver.current_location || { lat: 'Unknown', long: 'Unknown' };

    // Respond with the driver's current location
    res.status(200).json({ location: currentLocation });
  } catch (error) {
    console.error('Error fetching transportation info:', error);
    res.status(500).json({ error: 'Error fetching transportation info' });
  }
};
