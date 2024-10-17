import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const TrackTransportation = () => {
  const { bookingId } = useParams(); // Get booking ID from URL
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Fetch the driver's current location from the backend
    const fetchLocation = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/track/${bookingId}`);
        const data = await response.json();
        if (response.ok) {
          setLocation(data.location); // Assuming API returns location
        } else {
          console.error('Error fetching location:', data.error);
        }
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };

    fetchLocation();
  }, [bookingId]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="max-w-screen-md p-6 bg-gray-800 rounded-lg shadow-lg text-white">
        <h1 className="text-3xl font-bold mb-4 text-center">Track Transportation</h1>
        {location ? (
          <div>
            <p>Current Location: {location}</p>
            {/* You can integrate Google Maps here if desired */}
          </div>
        ) : (
          <p>Loading location...</p>
        )}
      </div>
    </div>
  );
};

export default TrackTransportation;
