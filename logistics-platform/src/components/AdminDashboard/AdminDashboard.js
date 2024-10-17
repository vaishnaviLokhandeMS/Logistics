import React from 'react';
import Navbar from './AdminNavbar';  // Shared Navbar component
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <Navbar />  {/* Shared Navbar */}
      <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 gap-6">
        <Link to="/admin/driver-activity" className="bg-blue-600 p-4 rounded-lg text-center">
          Driver Activity
        </Link>
        {/* You can add more admin features here */}
      </div>
    </div>
  );
};

export default AdminDashboard;
