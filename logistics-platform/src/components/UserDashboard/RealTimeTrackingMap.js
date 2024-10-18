import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');  // Connect to the server

const containerStyle = {
  width: '100%',
  height: '400px'
};

const RealTimeTrackingMap = ({ driverId }) => {
  const [driverLocation, setDriverLocation] = useState({ lat: 0, long: 0 });

  useEffect(() => {
    // Listen for location updates from the server
    socket.on('trackDriver', (data) => {
      if (data.driverId === driverId) {
        setDriverLocation({ lat: data.lat, long: data.long });
      }
    });

    return () => socket.off('trackDriver');  // Clean up when component unmounts
  }, [driverId]);

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

export default RealTimeTrackingMap;
