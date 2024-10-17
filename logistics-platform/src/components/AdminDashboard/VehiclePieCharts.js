import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import AdminNavbar from './AdminNavbar'; // Include AdminNavbar component

const VehiclePieCharts = () => {
  const [vehicleData, setVehicleData] = useState([]);
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admins/vehicle-demand');
        setVehicleData(response.data); // Set the fetched data
      } catch (error) {
        console.error('Error fetching vehicle data:', error);
      }
    };

    fetchVehicleData();
  }, []);

  // Preparing data for the pie charts
  const prepareDataForPieChart = (field) => {
    return vehicleData.map((vehicle) => ({
      name: vehicle.vehicle_type,
      value: vehicle[field],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <AdminNavbar /> {/* Include the AdminNavbar */}

      <h2 className="text-center text-3xl font-bold mb-8">Vehicle Pie Charts</h2>
      
      {/* Horizontal Flexbox container for pie charts */}
      <div className="flex justify-center space-x-6">
        {/* Available Vehicles Pie Chart */}
        <div className="chart-container w-1/3">
          <h3 className="text-center text-xl mb-2">Available Vehicles</h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={prepareDataForPieChart('available')}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {vehicleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Vehicles in Transportation Pie Chart */}
        <div className="chart-container w-1/3">
          <h3 className="text-center text-xl mb-2">Vehicles in Transportation</h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={prepareDataForPieChart('for_transportation')}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                fill="#82ca9d"
                dataKey="value"
              >
                {vehicleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Current Demand Pie Chart */}
        <div className="chart-container w-1/3">
          <h3 className="text-center text-xl mb-2">Current Demand</h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={prepareDataForPieChart('current_demand')}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                fill="#ffc658"
                dataKey="value"
              >
                {vehicleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default VehiclePieCharts;
