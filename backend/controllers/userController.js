const User = require('../models/userModel');  // Import the User model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User signup function
exports.signup = async (req, res) => {
  const { fullName, email, password, phone, location } = req.query;  // Capture from query params

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      phone,
      location,  // Optional location field
    });

    await newUser.save();
    res.status(201).json({ message: 'User signed up successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// User login function
exports.login = async (req, res) => {
    const { email, password } = req.body;  // Now using req.body
  
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: 'Invalid credentials' });
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return res.status(400).json({ error: 'Invalid credentials' });
  
      // Generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.status(200).json({ token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };