const mongoose = require('mongoose');

// Define driver schema with location, status, and request counters
const driverSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    driver_id: { type: String, required: true, unique: true },
    location: {
        lat: { type: Number },  // Latitude
        long: { type: Number }  // Longitude
    },
    status: {
        type: String, 
        enum: ['available', 'busy'],  // Driver status (free or in transportation)
        default: 'available'
    },
    requests_accepted: { type: Number, default: 0 },  // Count of total requests accepted
    requests_delivered: { type: Number, default: 0 }   // Count of total requests delivered
});

// Create driver model
const Driver = mongoose.model('drivers', driverSchema);

module.exports = Driver;
