import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Booking from './components/UserDashboard/Booking'; // Booking Page
import Login from './components/Auth/Login.';
import Signup from './components/Auth/SignUp';
import LoginDriver from './components/Auth/LoginDriver';
import LoginAdmin from './components/Auth/LoginAdmin';
import Home from './components/Home/Home';
import DriverDashboard from './components/DriverDashboard/DriverDashboard';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import ActiveRequests from './components/DriverDashboard/ActiveRequests';
import CompletedRequests from './components/DriverDashboard/CompletedRequests';
import TrackTransportation from './components/UserDashboard/TrackTransportation';
import VehicleDemand from './components/DriverDashboard/VehicleDemand'; 
import DriverActivity from './components/AdminDashboard/DriverActivity';
import BookingStatsChart from './components/AdminDashboard/BookingStatsChart';
import VehiclePieCharts from './components/AdminDashboard/VehiclePieCharts';
import DeliveryStatsChart from './components/AdminDashboard/DeliveryStatsChart';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} /> {/* Home page */}
        <Route path="/login-user" element={<Login userType="user" />} /> {/* User login */}
        <Route path="/login-driver" element={<LoginDriver userType="driver" />} /> {/* Driver login */}
        <Route path="/login-admin" element={<LoginAdmin userType="admin" />} />
        <Route path="/signup-user" element={<Signup userType="user"/>} /> {/* Signup page */}
        <Route path="/user-dashboard" element={<Booking />} /> {/* User dashboard */}
        <Route path="/driver-dashboard" element={<DriverDashboard />} /> {/* Driver dashboard */}
        <Route path="/active-requests" element={<ActiveRequests />} />
        <Route path="/completed-requests" element={<CompletedRequests />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/track/:bookingId" element={<TrackTransportation />} />
        <Route path="/vechicle-demand" element={<VehicleDemand />} />
        <Route path="/admin/driver-activity" element={<DriverActivity />} />
        <Route path="/admin/available-vechicles" element={<VehiclePieCharts />} />
        <Route path="/admin/booking-data" element={<BookingStatsChart />} />
        <Route path="/admin/trips-completed" element={<DeliveryStatsChart />} />
      </Routes>
    </Router>
  );
}

export default App;