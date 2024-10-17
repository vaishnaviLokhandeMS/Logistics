const Admin = require('../models/adminModel');

// Admin login
exports.loginAdmin = async (req, res) => {
    console.log('Request received for admin login');  // Check if the function is triggered

    // Log the incoming request body to check if email and password are being received correctly
    console.log('Request body:', req.body);

    const { email, password } = req.body;

    // Check if required fields are present
    if (!email || !password) {
        console.log('Email or password missing');  // Log missing fields
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        // Fetch all admins to log their email addresses
        const allAdmins = await Admin.find({});
        console.log('All Admin Emails:');
        allAdmins.forEach(admin => {
            console.log(admin.email);  // Print each admin's email
        });

        // Check if the Admin collection is being queried correctly
        console.log('Checking for Admin with email:', email);

        // Find admin by email
        const admin = await Admin.findOne({ email });

        // Log the result of the query
        if (!admin) {
            console.log('Admin not found with email:', email);
        } else {
            console.log('Admin found:', admin);
        }

        if (!admin || admin.password !== password) {
            console.log('Invalid email or password');  // Log the failure reason
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // If the login is successful
        console.log('Login successful for admin:', admin._id);
        res.status(200).json({ message: 'Login successful', adminID: admin._id });
    } catch (err) {
        console.error('Error during admin login:', err);  // Log any error that occurs
        res.status(500).json({ error: err.message });
    }
};
