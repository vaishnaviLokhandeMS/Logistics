const jwt = require('jsonwebtoken');

exports.verifyDriverToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the authorization header
    console.log('Received token:', token);  // Log the token for debugging
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    try {
      const secret = process.env.JWT_SECRET;  // Fetch JWT secret from the environment variables
      console.log('JWT_SECRET:', secret);  // Log the secret to verify it’s correct (for debugging purposes)
      
      const decoded = jwt.verify(token, secret);  // Verify the token using the secret
      console.log('Decoded token:', decoded);  // Log the decoded token payload
      
      req.user = decoded;  // Attach the decoded payload to the request
      next();  // Proceed to the next middleware or route handler
    } catch (error) {
      console.error('Token verification error:', error);  // Log the verification error
      return res.status(401).json({ message: 'Invalid token' });
    }
};
