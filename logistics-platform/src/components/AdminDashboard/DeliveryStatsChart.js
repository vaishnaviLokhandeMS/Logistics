import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import AdminNavbar from './AdminNavbar'; // Import the shared AdminNavbar component

const DeliveredStatsChart = () => {
  const [deliveredData, setDeliveredData] = useState([]);

  // Fetch total deliveries from the backend
  useEffect(() => {
    const fetchDeliveredData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admins/total-delivered');
        setDeliveredData(response.data); // Set the fetched data to state
      } catch (error) {
        console.error('Error fetching delivered data:', error);
      }
    };
    fetchDeliveredData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <AdminNavbar /> {/* Include the AdminNavbar */}

      <div className="container mx-auto py-8 px-4">
        <h2 className="text-center text-3xl font-semibold mb-8">Completed Deliveries by Vehicle Type</h2>
        
        {/* Bar Chart for Delivered Data */}
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={deliveredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="vehicle_type" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total_delivered" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DeliveredStatsChart;
