const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');  // Import CORS middleware
const connectDB = require('./config/mongodb');  // MongoDB connection
const { connectCassandra } = require('./config/cassandra');  // Cassandra connection
const { connectRedis } = require('./config/redis');  // Redis connection
const http = require('http');
const socketIO = require('socket.io'); // Socket.IO for real-time updates

dotenv.config();

const app = express();
const server = http.createServer(app); // Create HTTP server with Express
const io = socketIO(server); // Initialize Socket.IO on the same server

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin: '*' }));  // Enable CORS for all origins

// Initialize database connections in parallel
const initDatabases = async () => {
    try {
        await Promise.all([connectDB(), connectCassandra(), connectRedis()]);
        console.log('All databases connected');
    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1);  // Exit if any database fails to connect
    }
};

initDatabases();

// Health check route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Import Routes
const bookingRoutes = require('./routes/bookingRoutes');
const userRoutes = require('./routes/userRoutes');  // Import user routes
const driverRoutes = require('./routes/driverRoutes');  // Import driver routes
const adminRoutes = require('./routes/adminRoutes');  // Import admin routes
const autocompleteRoutes = require('./routes/autocomplete');
const vehicleRoutes = require('./routes/vehicleRoutes');

// Use Routes
app.use('/api/bookings', bookingRoutes);  // Booking API routes
app.use('/api/users', userRoutes);  // User API routes
app.use('/api/drivers', driverRoutes);  // Driver API routes
app.use('/api/admins', adminRoutes);  // Admin API routes
app.use('/api/locations', autocompleteRoutes); 
app.use('/api/admins', vehicleRoutes); // Use a clearer base path for vehicle routes

// Socket.IO - Handle real-time location tracking
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Listen for location updates from the driver
    socket.on('locationUpdate', (data) => {
        const { driverId, lat, long } = data;
        // Broadcast the location to all connected clients
        io.emit('trackDriver', { driverId, lat, long });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    res.status(500).json({ message: 'Internal Server Error' });
});

// Server listen on port
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
