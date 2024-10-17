import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <div className="bg-gray-800 p-6 text-white mb-8">
      {/* Title in the center */}
      <div className="text-center mb-4">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
      </div>

      {/* Navigation Links */}
      <div className="flex justify-center space-x-6">
        <Link to="/admin/available-vechicles" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Available Vehicles
        </Link>
        <Link to="/admin/driver-activity" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Driver Activity
        </Link>
        <Link to="/admin/booking-data" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Booking Data
        </Link>
        <Link to="/admin/trips-completed" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Trips Completed
        </Link>
        <Link to="/admin/driver-performance" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Driver Performance
        </Link>
      </div>
    </div>
  );
};

export default AdminNavbar;
