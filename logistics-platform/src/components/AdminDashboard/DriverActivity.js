import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';

const DriverActivity = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);

  // Fetch driver suggestions based on the search term
  useEffect(() => {
    if (searchTerm.length > 0) {
      const fetchSuggestions = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/admins/driver-suggestions`, {
            params: { search: searchTerm }
          });
          setSuggestions(response.data);  // Set the fetched driver suggestions
        } catch (error) {
          console.error('Error fetching driver suggestions:', error);
        }
      };
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  // Fetch selected driver details
  const handleSuggestionClick = async (driverId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/admins/driver/${driverId}`);
      setSelectedDriver(response.data);  // Set the selected driver details
      setSuggestions([]);  // Clear suggestions once a driver is selected
    } catch (error) {
      console.error('Error fetching driver details:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <AdminNavbar />
      <h1 className="text-4xl font-bold mb-6">Driver Activity</h1>

      {/* Search bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by driver name or ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 border border-gray-600 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Display suggestions */}
      {suggestions.length > 0 && (
        <ul className="bg-gray-800 p-4 rounded-lg max-h-60 overflow-y-auto">
          {suggestions.map((driver) => (
            <li
              key={driver.driver_id}
              onClick={() => handleSuggestionClick(driver.driver_id)}
              className="cursor-pointer p-2 hover:bg-gray-700"
            >
              {driver.fullName} (ID: {driver.driver_id})
            </li>
          ))}
        </ul>
      )}

      {/* Display selected driver details */}
      {selectedDriver && (
        <div className="mt-6 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Driver Details</h2>
          <div className="text-lg">
            <p className="mb-4"><strong>Full Name:</strong> {selectedDriver.fullname}</p>
            <p className="mb-4"><strong>Email:</strong> {selectedDriver.email}</p>
            <p className="mb-4"><strong>Phone:</strong> {selectedDriver.phone}</p>
            <p className="mb-4"><strong>Location:</strong> Lat: {selectedDriver.location.lat}, Long: {selectedDriver.location.long}</p>
            <p className="mb-4"><strong>Status:</strong> <span className={`font-bold ${selectedDriver.status === 'available' ? 'text-green-400' : 'text-yellow-400'}`}>{selectedDriver.status}</span></p>
            <p className="mb-4"><strong>Requests Accepted:</strong> {selectedDriver.requests_accepted}</p>
            <p className="mb-4"><strong>Requests Delivered:</strong> {selectedDriver.requests_delivered}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverActivity;
