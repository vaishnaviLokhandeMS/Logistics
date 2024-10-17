const mongoose = require('mongoose');

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
  }
});

const VehicleDemand = mongoose.model('vechicle_demand', vehicleDemandSchema);

module.exports = VehicleDemand;
