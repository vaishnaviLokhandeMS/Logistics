import React, { useEffect, useState } from 'react';

const Booking = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState([]);
  const [vehicleType, setVehicleType] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState(null); // State to store the estimated price
  const [bookingDetails, setBookingDetails] = useState(null); // Store the full booking details after estimation

  // Fetch location suggestions from the backend
  const fetchLocationSuggestions = async (input, setSuggestions) => {
    try {
      const response = await fetch(`http://localhost:5000/api/locations/autocomplete?input=${input}`);
      const data = await response.json();

      if (data && data.predictions) {
        const suggestions = data.predictions.map((prediction) => prediction.description);
        setSuggestions(suggestions);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching location suggestions:', error);
      setSuggestions([]);
    }
  };

  // Handle location input change and fetch suggestions
  const handleLocationChange = (e, setLocation, setSuggestions) => {
    const input = e.target.value;
    setLocation(input);

    if (input.length > 2) {
      fetchLocationSuggestions(input, setSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  // Handle form submission to get the estimated price
  const handleEstimate = async (e) => {
    e.preventDefault();
    const bookingDetails = {
      pickupLocation,
      dropoffLocation,
      vehicleType,
    };

    try {
      // Call backend API to get price estimation
      const response = await fetch('http://localhost:5000/api/bookings/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingDetails),
      });

      const data = await response.json();
      if (response.ok) {
        // Set the estimated price and store booking details
        setEstimatedPrice(data.cost.toFixed(2)); // Rounds to two decimal places
        setBookingDetails({ ...bookingDetails, cost: data.cost }); // Save the booking details with cost
      } else {
        console.error('Error getting price estimate:', data.error);
        setEstimatedPrice(null);
        setBookingDetails(null);
      }
    } catch (error) {
      console.error('Error submitting booking details:', error);
      setEstimatedPrice(null);
      setBookingDetails(null);
    }
  };

  // Handle actual booking submission to store booking details in database
  const handleBooking = async () => {
    if (!bookingDetails) return;

    try {
      // Call backend API to store booking details
      const response = await fetch('http://localhost:5000/api/bookings/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingDetails), // Send the full booking details including cost
      });

      const data = await response.json();
      if (response.ok) {
        alert('Booking successful!');
      } else {
        console.error('Error booking the vehicle:', data.error);
      }
    } catch (error) {
      console.error('Error booking the vehicle:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="max-w-screen-md p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-4 text-center">Book a Vehicle</h1>

        <form onSubmit={handleEstimate} className="space-y-4">
          {/* Pickup Location Input with Suggestions */}
          <input
            type="text"
            placeholder="Select Pickup Location"
            value={pickupLocation}
            onChange={(e) => handleLocationChange(e, setPickupLocation, setPickupSuggestions)}
            className="w-full p-4 border border-gray-600 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {pickupSuggestions.length > 0 && (
            <ul className="bg-gray-700 text-white p-2 rounded-lg mt-1 max-h-48 overflow-y-auto">
              {pickupSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="cursor-pointer p-2 hover:bg-gray-600 rounded-lg"
                  onClick={() => {
                    setPickupLocation(suggestion);
                    setPickupSuggestions([]);
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}

          {/* Dropoff Location Input with Suggestions */}
          <input
            type="text"
            placeholder="Select Dropoff Location"
            value={dropoffLocation}
            onChange={(e) => handleLocationChange(e, setDropoffLocation, setDropoffSuggestions)}
            className="w-full p-4 border border-gray-600 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {dropoffSuggestions.length > 0 && (
            <ul className="bg-gray-700 text-white p-2 rounded-lg mt-1 max-h-48 overflow-y-auto">
              {dropoffSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="cursor-pointer p-2 hover:bg-gray-600 rounded-lg"
                  onClick={() => {
                    setDropoffLocation(suggestion);
                    setDropoffSuggestions([]);
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}

          {/* Vehicle Type Selection */}
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="w-full p-4 border border-gray-600 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Vehicle Type</option>
            <option value="small">Small Van</option>
            <option value="medium">Medium Truck</option>
            <option value="large">Large Truck</option>
          </select>

          {/* Submit Button to get price estimate */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-4 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
          >
            Get Price Estimate
          </button>
        </form>

        {/* Display estimated price */}
        {estimatedPrice !== null && (
          <div className="mt-4 p-4 bg-green-600 text-white rounded-lg text-center">
            Estimated Price: ${estimatedPrice}
          </div>
        )}

        {/* Book It Button */}
        {estimatedPrice !== null && bookingDetails && (
          <button
            className="mt-4 w-full bg-green-500 text-white p-4 rounded-lg font-semibold hover:bg-green-600 transition duration-200"
            onClick={handleBooking}
          >
            Book It
          </button>
        )}
      </div>
    </div>
  );
};

export default Booking;
