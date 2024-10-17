import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="bg-gray-800 p-6 text-white mb-8">
      {/* Title in the center */}
      <div className="text-center mb-4">
        <h1 className="text-4xl font-bold">Driver Dashboard</h1>
      </div>

      {/* Navigation Links */}
      <div className="flex justify-center space-x-6">
        <Link to="/driver-dashboard" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          New Booking Requests
        </Link>
        <Link to="/active-requests" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Active Requests
        </Link>
        <Link to="/completed-requests" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Completed Requests
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
