const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const Driver = require('../models/driverModel');
const Admin = require('../models/adminModel');

// Signup function (user/driver/admin)
exports.signup = async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  let user;
  
  if (role === 'driver') {
    user = new Driver({ username, password: hashedPassword, ...req.body });
  } else if (role === 'admin') {
    user = new Admin({ username, password: hashedPassword, ...req.body });
  } else {
    user = new User({ username, password: hashedPassword, ...req.body });
  }

  await user.save();
  res.status(201).json({ message: 'Account created successfully' });
};

// Login function
exports.login = async (req, res) => {
  const { username, password, role } = req.body;
  let user;

  if (role === 'driver') {
    user = await Driver.findOne({ username });
  } else if (role === 'admin') {
    user = await Admin.findOne({ username });
  } else {
    user = await User.findOne({ username });
  }

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({ token });
};
