import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import AdminNavbar from './AdminNavbar'; // Import the shared AdminNavbar component

const BookingStatsChart = () => {
  const [bookingData, setBookingData] = useState([]);

  // Fetch total bookings from the backend
  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admins/total-bookings');
        setBookingData(response.data); // Set the fetched data to state
      } catch (error) {
        console.error('Error fetching booking data:', error);
      }
    };
    fetchBookingData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <AdminNavbar /> {/* Include the AdminNavbar */}

      <div className="container mx-auto py-8 px-4">
        <h2 className="text-center text-4xl font-bold mb-8">Total Bookings by Vehicle Type</h2>
        
        {/* Line Chart for Bookings */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={bookingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="vehicle_type" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total_bookings" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default BookingStatsChart;
