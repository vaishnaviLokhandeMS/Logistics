const mongoose = require('mongoose');

// Define driver schema
const driverSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    driver_id: {type: String, required: true},
});

// Create driver model
const Driver = mongoose.model('drivers', driverSchema);

module.exports = Driver;
