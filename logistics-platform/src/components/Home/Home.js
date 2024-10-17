import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';  // Custom CSS for particles and truck animation

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 relative flex flex-col justify-center items-center text-white overflow-hidden">
      {/* Background particles */}
      <div id="particles-background"></div>

      <h1 className="text-4xl font-bold mb-10">Welcome to the Logistics Platform</h1>

      <div className="flex space-x-10">
        {/* User Section */}
        <div
          className="w-60 h-40 bg-green-500 rounded-xl flex justify-center items-center text-center shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105 cursor-pointer"
          onClick={() => navigate('/login-user')}
        >
          <h2 className="text-2xl font-semibold">User</h2>
        </div>

        {/* Driver Section */}
        <div
          className="w-60 h-40 bg-orange-500 rounded-xl flex justify-center items-center text-center shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105 cursor-pointer"
          onClick={() => navigate('/login-driver')}
        >
          <h2 className="text-2xl font-semibold">Driver</h2>
        </div>

        {/* Admin Section */}
        <div
          className="w-60 h-40 bg-pink-500 rounded-xl flex justify-center items-center text-center shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105 cursor-pointer"
          onClick={() => navigate('/login-admin')}
        >
          <h2 className="text-2xl font-semibold">Admin</h2>
        </div>
      </div>

      {/* Cartoon Truck Animation */}
      <div className="truck-animation"></div>
    </div>
  );
};

export default Home;
