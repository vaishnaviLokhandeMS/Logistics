const mongoose = require('mongoose');

const FleetSchema = new mongoose.Schema({
  fleetID: String,
  vehicles: Array,
  drivers: Array,
});

const AdminSchema = new mongoose.Schema({
  adminID: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,  // Plain text password
  },
  fleet: [FleetSchema],
});

module.exports = mongoose.model('admins', AdminSchema);
