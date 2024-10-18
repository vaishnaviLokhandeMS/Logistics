const mongoose = require('mongoose');

// Define Vehicle Demand Schema
const vehicleDemandSchema = new mongoose.Schema({
  vehicle_type: {
    type: String,
    required: true,
  },
  current_demand: {
    type: Number,
    required: true,
  },
  available: {
    type: Number,
    required: true,  // Number of available vehicles
    default: 0
  },
  under_maintenance: {
    type: Number,
    required: true,  // Number of vehicles under maintenance
    default: 0
  },
  for_transportation: {
    type: Number,
    required: true,  // Number of vehicles out for transportation
    default: 0
  },
  total_bookings: {
    type: Number,
    required: true,  // Total bookings made so far for this vehicle type
    default: 0
  }, 
  total_today: {
    type: Number,
    required: true,  // Total bookings made so far for this vehicle type
    default: 0
  },
  total_delivered: {
    type: Number,
    required: true,  
    default: 0
  }
});

const VehicleDemand = mongoose.model('vechicle_demands', vehicleDemandSchema);

module.exports = VehicleDemand;
