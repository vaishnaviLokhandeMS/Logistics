const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },  // Password should be hashed
    phone: { type: String, required: true },
    location: String,  // User's location
});

module.exports = mongoose.model('User', UserSchema);
