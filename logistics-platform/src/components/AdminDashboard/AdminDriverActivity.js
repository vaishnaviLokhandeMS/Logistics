import React, { useEffect, useState } from 'react';
import { fetchDriverActivity } from './fetchAdminData';

const AdminDriverActivity = () => {
  const [driverActivity, setDriverActivity] = useState([]);

  useEffect(() => {
    const getDriverActivity = async () => {
      const data = await fetchDriverActivity();
      setDriverActivity(data);
    };

    getDriverActivity();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-4xl font-bold mb-6">Driver Activity</h1>

      {/* Driver Activity Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white rounded-lg shadow-lg border-separate border border-gray-700">
          <thead>
            <tr className="bg-gray-700">
              <th className="py-3 px-4 border border-gray-600">Driver Name</th>
              <th className="py-3 px-4 border border-gray-600">Status</th>
              <th className="py-3 px-4 border border-gray-600">Total Requests Accepted</th>
              <th className="py-3 px-4 border border-gray-600">Total Delivered</th>
            </tr>
          </thead>
          <tbody>
            {driverActivity.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-3 px-4 text-center">No drivers available</td>
              </tr>
            ) : (
              driverActivity.map((driver) => (
                <tr key={driver.driver_id}>
                  <td className="py-3 px-4 border border-gray-600">{driver.name}</td>
                  <td className="py-3 px-4 border border-gray-600">
                    {driver.status === 'available' ? 'Available' : 'In Transportation'}
                  </td>
                  <td className="py-3 px-4 border border-gray-600">{driver.total_accepted}</td>
                  <td className="py-3 px-4 border border-gray-600">{driver.total_delivered}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDriverActivity;
