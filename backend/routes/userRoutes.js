const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');  // Make sure the path is correct

// Route to create a user (Signup)
router.post('/signup', userController.signup);

// Route to login a user
router.post('/login', userController.login);

module.exports = router;
