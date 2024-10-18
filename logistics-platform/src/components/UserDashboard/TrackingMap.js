import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const TrackingMap = ({ driverId }) => {
  const [driverLocation, setDriverLocation] = useState({ lat: 0, long: 0 });

  // Fetch driver's location from the backend
  const fetchDriverLocation = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/drivers/location/${driverId}`);
      setDriverLocation(response.data.location);
    } catch (error) {
      console.error('Error fetching driver location:', error);
    }
  };

  // Poll for location updates every 10 seconds
  useEffect(() => {
    const intervalId = setInterval(fetchDriverLocation, 10000);  // Update every 10 seconds
    return () => clearInterval(intervalId);  // Cleanup on unmount
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyC3ydMMSLL-N8gpwQTr8BnQPHa42pK_0TM">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: driverLocation.lat, lng: driverLocation.long }}
        zoom={15}
      >
        {/* Marker showing driver's location */}
        <Marker position={{ lat: driverLocation.lat, lng: driverLocation.long }} />
      </GoogleMap>
    </LoadScript>
  );
};

export default TrackingMap;
