const Driver = require('../models/driverModel');  // Driver model
const Booking = require('../models/bookingModel');  // Booking model
const VehicleDemand = require('../models/vehicleDemandModel'); 
const jwt = require('jsonwebtoken');

exports.loginDriver = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find driver by email
        const driver = await Driver.findOne({ email });

        if (!driver) {
            return res.status(404).json({ message: 'Driver not found' });
        }

        // Directly compare passwords (since password is stored in plain text)
        if (password !== driver.password) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate JWT token with driver ID
        const token = jwt.sign({ id: driver._id, role: 'driver' }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        
        // Respond with token and driver_id (NOT _id)
        res.status(200).json({ message: 'Login successful', token, driverId: driver.driver_id });
    } catch (error) {
        console.error('Error logging in driver:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Fetch new bookings with status 'pending'
exports.getPendingBookings = async (req, res) => {
    try {
        const { driverId } = req.params;

        // Fetch all pending bookings
        const pendingBookings = await Booking.find({ status: 'pending' });

        res.status(200).json({ pendingBookings });
    } catch (error) {
        console.error('Error fetching pending bookings:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.acceptBooking = async (req, res) => {
    const { bookingId, driverId, vehicleType } = req.body;  // Now include vehicleType in request

    console.log('Received bookingId:', bookingId);
    console.log('Received driverId:', driverId);

    try {
        // 1. Find the driver by driver_id
        const driver = await Driver.findOne({ driver_id: driverId });

        if (!driver) {
            return res.status(404).json({ message: 'Driver not found' });
        }

        // 2. Update the booking with the driverId and change its status to 'en_route'
        const booking = await Booking.findOneAndUpdate(
            { booking_id: bookingId },
            { 
                status: 'en_route', 
                driver_id: driverId  // Store driver_id in the booking
            },
            { new: true }  // Return the updated document
        );

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // 3. Update driver's requests_accepted and status without revalidating the entire document
        await Driver.updateOne(
            { driver_id: driverId },
            {
                $inc: { requests_accepted: 1 },  // Increment requests_accepted
                $set: { status: 'busy' }  // Set status to busy
            }
        );

        // 4. Fetch and update the VehicleDemand for the accepted vehicle type
        const vehicleDemand = await VehicleDemand.findOne({ vehicle_type: vehicleType });
        const today = new Date().toISOString().split('T')[0];  // Get today's date in 'YYYY-MM-DD' format
        console.log('Today:', today);

        if (vehicleDemand) {
            vehicleDemand.available -= 1;  // Decrease available vehicles by 1
            vehicleDemand.for_transportation += 1;  // Increase for_transportation by 1
            vehicleDemand.current_demand = Math.max(0, vehicleDemand.current_demand - 1);  // Ensure current_demand doesn't go negative
            vehicleDemand.total_bookings.set(today, (vehicleDemand.total_bookings.get(today) || 0) + 1);  // Increment today's bookings by 1
            await vehicleDemand.save();  // Save the updated vehicle demand document
        } else {
            console.log(`Vehicle type ${vehicleType} not found in demand collection.`);
        }

        // 5. Respond with the updated booking details
        res.status(200).json({ message: 'Booking accepted', booking });
    } catch (error) {
        console.error('Error accepting booking:', error);  // Log the error for debugging
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getActiveBookings = async (req, res) => {
    try {
        const { driverId } = req.params;

        // Fetch bookings where the status is either 'en_route' or 'goods_collected' for the specific driver
        const activeBookings = await Booking.find({ 
            driver_id: driverId, 
            status: { $in: ['en_route', 'goods_collected'] }  // Check for either of the two statuses
        });

        if (!activeBookings || activeBookings.length === 0) {
            return res.status(404).json({ message: 'No active bookings found' });
        }

        res.status(200).json({ activeBookings });
    } catch (error) {
        console.error('Error fetching active bookings:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateJobStatus = async (req, res) => {
    const { bookingId, status, vehicleType } = req.body;  // Add vehicleType in request body

    try {
        console.log('Received bookingId:', bookingId);
        console.log('Received new status:', status);
        console.log('Received vehicleType:', vehicleType);

        // 1. Find the booking by booking_id and update its status
        const updatedBooking = await Booking.findOneAndUpdate(
            { booking_id: bookingId },  // Find the booking by booking_id
            { status: status },  // Update the status with the new status provided by the driver
            { new: true }  // Return the updated document after modification
        );

        if (!updatedBooking) {
            console.log('Booking not found for ID:', bookingId);
            return res.status(404).json({ message: 'Booking not found' });  // Return error if no booking is found
        }

        console.log('Booking found and updated:', updatedBooking);

        // 2. Check if the status is 'delivered' to update vehicle demand and driver's requests_delivered
        if (status === 'delivered') {
            console.log('Status is delivered, updating vehicle demand for type:', vehicleType);

            // Update VehicleDemand
            const vehicleDemand = await VehicleDemand.findOne({ vehicle_type: vehicleType });
            if (vehicleDemand) {
                console.log('Vehicle demand found for vehicleType:', vehicleType);

                // Increment available vehicles and total delivered for this vehicle type
                vehicleDemand.available += 1;
                vehicleDemand.for_transportation = Math.max(0, vehicleDemand.for_transportation - 1);  // Ensure the number doesn't go negative
                vehicleDemand.total_delivered += 1;
                await vehicleDemand.save();

                console.log('Vehicle demand updated (total_delivered incremented):', vehicleDemand);
            } else {
                console.log('Vehicle demand not found for vehicleType:', vehicleType);
            }

            // Update Driver's requests_delivered using findOneAndUpdate
            const driverId = updatedBooking.driver_id;
            const driver = await Driver.findOneAndUpdate(
                { driver_id: driverId },  // Find the driver by driver_id
                { $inc: { requests_delivered: 1 } },  // Increment requests_delivered by 1
                { new: true }  // Return the updated document after modification
            );

            if (driver) {
                console.log('Driver requests_delivered incremented:', driver.requests_delivered);
            } else {
                console.log('Driver not found for driverId:', driverId);
            }
        }

        // 3. Respond with the updated booking
        res.status(200).json({ message: 'Booking status updated', booking: updatedBooking });
    } catch (error) {
        console.error('Error updating booking status:', error);  // Log any errors that occur
        res.status(500).json({ message: 'Server error' });  // Return server error if something goes wrong
    }
};

// Fetch completed bookings (status: delivered)
exports.getCompletedBookings = async (req, res) => {
    const { driverId } = req.params;

    try {
        const completedBookings = await Booking.find({
            status: 'delivered', 
            driver_id: driverId 
        });

        if (!completedBookings || completedBookings.length === 0) {
            return res.status(404).json({ message: 'No completed bookings found' });
        }

        res.status(200).json({ completedBookings });
    } catch (error) {
        console.error('Error fetching completed bookings:', error);
        res.status(500).json({ message: 'Server error' });
    }
};



exports.updateDriverLocation = async (req, res) => {
    const { driverId, lat, long } = req.body;

    try {
        // Find driver and update location
        const driver = await Driver.findOneAndUpdate(
            { driver_id: driverId },
            { location: { lat, long } },  // Update the location field
            { new: true }
        );

        if (!driver) {
            return res.status(404).json({ message: 'Driver not found' });
        }

        res.status(200).json({ message: 'Driver location updated', driver });
    } catch (error) {
        console.error('Error updating driver location:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.getDriverLocation = async (req, res) => {
    const { driverId } = req.params;

    try {
        const driver = await Driver.findOne({ driver_id: driverId });
        if (!driver) {
            return res.status(404).json({ message: 'Driver not found' });
        }
        res.status(200).json({ location: driver.location });
    } catch (error) {
        console.error('Error fetching driver location:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getDriverLocationByBookingId = async (req, res) => {
    const { bookingId } = req.params;

    try {
        // Find the booking by ID to get the driverId
        const booking = await Booking.findOne({ booking_id: bookingId });

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Find the driver using the driver_id
        const driver = await Driver.findOne({ driver_id: booking.driver_id });

        if (!driver) {
            return res.status(404).json({ message: 'Driver not found' });
        }

        res.status(200).json({ location: driver.location });
    } catch (error) {
        console.error('Error fetching driver location:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
