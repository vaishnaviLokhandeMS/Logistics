import React, { useEffect, useState } from 'react';
import { fetchVehicleDemand } from './fetchDriverData';

const VehicleDemand = () => {
  const [demandData, setDemandData] = useState([]); // Initialize as empty array

  useEffect(() => {
    const getVehicleDemand = async () => {
      const data = await fetchVehicleDemand();
      console.log(data); // Check what's coming from API
      if (data) {
        setDemandData(data); // Set fetched data into state
      }
    };

    getVehicleDemand();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Vehicle Demand Data</h1>
      
      {demandData.length > 0 ? (
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Vehicle Type</th>
              <th className="py-3 px-6 text-left">Available</th>
              <th className="py-3 px-6 text-left">For Transportation</th>
              <th className="py-3 px-6 text-left">Under Maintenance</th>
            </tr>
          </thead>
          <tbody>
            {demandData.map((vehicle, index) => (
              <tr key={index} className="bg-gray-50 hover:bg-gray-100 border-b border-gray-200">
                <td className="py-3 px-6">{vehicle.vehicle_type}</td>
                <td className="py-3 px-6">{vehicle.available}</td>
                <td className="py-3 px-6">{vehicle.for_transportation}</td>
                <td className="py-3 px-6">{vehicle.under_maintenance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600 text-xl">No data available</p> // Display a message if no data is available
      )}
    </div>
  );
};

export default VehicleDemand;
