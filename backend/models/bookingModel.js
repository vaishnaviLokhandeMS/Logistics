const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  booking_id: { type: String, required: true, unique: true },
  user_id: { type: String, required: true },
  pickup_location: { type: String, required: true },
  dropoff_location: { type: String, required: true },
  vehicle_type: { type: String, required: true },
  distance: { type: Number, required: true },
  cost: { type: Number, required: true },
  current_demand: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  created_at: { type: Date, default: Date.now },
  driver_id: {type: String}
});

const Booking = mongoose.model('Booking', bookingSchema, 'bookings'); // Explicitly set the collection name

module.exports = Booking;
