  import React, { useEffect, useState } from 'react';
  import Navbar from './Navbar'; // Import the common Navbar
  import { fetchNewRequests } from './fetchDriverData'; // Your API call for fetching new requests

  const DriverDashboard = () => {
    const [newRequests, setNewRequests] = useState([]); // State to hold new requests
    const [showDialog, setShowDialog] = useState(false); // State to manage dialog visibility
    const [selectedBooking, setSelectedBooking] = useState(null); // State to hold selected booking details
    const [successMessage, setSuccessMessage] = useState(''); // To hold the success message

    const driverId = localStorage.getItem('driverId');

    // Fetch data when the component mounts
    useEffect(() => {
      fetchNewRequests(setNewRequests);  // Fetch pending bookings
    }, []);

    // Handle Accept Booking button click
    const handleAcceptBooking = (booking) => {
      setSelectedBooking(booking);  // Set the selected booking
      setShowDialog(true);  // Show the dialog
    };

    // Handle Confirm Booking in the dialog
    const handleConfirmBooking = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/drivers/accept-booking', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            bookingId: selectedBooking.booking_id,
            driverId: driverId,  // Replace with actual driverId from local storage or context
          }),
        });

        const data = await response.json();
        if (response.ok) {
          setSuccessMessage('Booking successfully accepted! 🎉');
          setShowDialog(false); // Close the dialog after confirmation
          // Optionally, you can refresh the new requests here
          fetchNewRequests(setNewRequests);  // Refresh the new booking requests
        } else {
          console.error('Error accepting booking:', data.error);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    return (
      <div className="min-h-screen bg-gray-900 text-white p-10">
        {/* Navbar for navigation */}
        <Navbar />

        <h1 className="text-4xl font-bold mb-6">New Booking Requests</h1>

        {/* New Booking Requests Section */}
        <div className="mb-8">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 text-white rounded-lg shadow-lg border-separate border border-gray-700">
              <thead>
                <tr className="bg-gray-700">
                  <th className="py-3 px-4 border border-gray-600">Date & Time</th>
                  <th className="py-3 px-4 border border-gray-600">Vehicle Type</th>
                  <th className="py-3 px-4 border border-gray-600">Pickup Location</th>
                  <th className="py-3 px-4 border border-gray-600">Dropoff Location</th>
                  <th className="py-3 px-4 border border-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {newRequests.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-3 px-4 text-center border border-gray-600">No new booking requests</td>
                  </tr>
                ) : (
                  newRequests.map((request) => (
                    <tr key={request.booking_id}>
                      <td className="py-3 px-4 border border-gray-600">{new Date(request.created_at).toLocaleString()}</td>
                      <td className="py-3 px-4 border border-gray-600">{request.vehicle_type}</td>
                      <td className="py-3 px-4 border border-gray-600">{request.pickup_location}</td>
                      <td className="py-3 px-4 border border-gray-600">{request.dropoff_location}</td>
                      <td className="py-3 px-4 border border-gray-600">
                        <button
                          onClick={() => handleAcceptBooking(request)}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                        >
                          Accept Booking
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Confirmation Dialog */}
        {showDialog && selectedBooking && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-90">
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-4">
              <h3 className="text-xl font-bold mb-4">Confirm Booking</h3>
              <p><strong>Pickup:</strong> {selectedBooking.pickup_location}</p>
              <p><strong>Dropoff:</strong> {selectedBooking.dropoff_location}</p>
              <p><strong>Vehicle Type:</strong> {selectedBooking.vehicle_type}</p>
              <p><strong>Date & Time:</strong> {new Date(selectedBooking.created_at).toLocaleString()}</p>

              {/* Success message */}
              {successMessage && (
                <div className="bg-green-500 text-white rounded-lg p-4 mt-4 text-center animate-pulse">
                  {successMessage}
                </div>
              )}

              {/* Confirm and Cancel buttons */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={handleConfirmBooking}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowDialog(false)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default DriverDashboard;
