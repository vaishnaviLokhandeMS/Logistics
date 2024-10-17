import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './AdminNavbar';

const AdminDashboard = () => {
  const [searchQuery, setSearchQuery] = useState(''); // For tracking search input
  const [suggestions, setSuggestions] = useState([]); // For suggestions list
  const [selectedDriver, setSelectedDriver] = useState(null); // For displaying selected driver details

  // Fetch suggestions as user types
  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.length > 0) {
      try {
        const response = await axios.get(`http://localhost:5000/api/admins/driver-suggestions`, {
          params: { search: query }
        });
        setSuggestions(response.data); // Update suggestions based on response
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    } else {
      setSuggestions([]); // Clear suggestions when search query is cleared
    }
  };

  // Fetch driver details when a suggestion is clicked
  const handleSuggestionClick = async (driverId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/admins/driver/${driverId}`);
      setSelectedDriver(response.data); // Set selected driver details to display
      setSuggestions([]); // Clear suggestions after selection
    } catch (error) {
      console.error('Error fetching driver details:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <Navbar />  {/* Include Navbar */}
      <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full p-4 border border-gray-600 bg-gray-700 rounded-lg text-white"
          placeholder="Search by driver ID or name"
        />
        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <ul className="bg-gray-800 mt-2 rounded-lg max-h-60 overflow-y-auto">
            {suggestions.map((driver) => (
              <li
                key={driver.driver_id}
                className="p-4 hover:bg-gray-600 cursor-pointer"
                onClick={() => handleSuggestionClick(driver.driver_id)}
              >
                {driver.fullName} - {driver.driver_id}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Driver Details */}
      {selectedDriver && (
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Driver Details</h2>
          <p><strong>Name:</strong> {selectedDriver.fullName}</p>
          <p><strong>Email:</strong> {selectedDriver.email}</p>
          <p><strong>Phone:</strong> {selectedDriver.phone}</p>
          <p><strong>Location:</strong> {selectedDriver.location.lat}, {selectedDriver.location.long}</p>
          <p><strong>Status:</strong> {selectedDriver.status}</p>
          <p><strong>Requests Accepted:</strong> {selectedDriver.requests_accepted}</p>
          <p><strong>Requests Delivered:</strong> {selectedDriver.requests_delivered}</p>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
