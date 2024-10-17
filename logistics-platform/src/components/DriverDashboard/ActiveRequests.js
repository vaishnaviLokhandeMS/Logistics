import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';  // Import the common Navbar
import { fetchActiveJobs, updateJobStatus } from './fetchDriverData'; // API call to fetch active jobs and update job status

const ActiveRequests = () => {
  const [activeJobs, setActiveJobs] = useState([]); // State to hold active jobs

  // Retrieve driverId from local storage
  const driverId = localStorage.getItem('driverId');

  // Fetch data when the component mounts
  useEffect(() => {
    if (driverId) {
      fetchActiveJobs(setActiveJobs, driverId);  // Fetch active jobs
    }
  }, [driverId]);

  // Handle status change immediately when a new status is selected from the dropdown
  const handleStatusChange = async (jobId, newStatus, vehicleType) => {
    try {
      // Update the job status via API
      const response = await updateJobStatus(jobId, newStatus, vehicleType);  // No need to send driverId here

      if (response) {
        if (newStatus === 'delivered') {
          // Remove job from active jobs if it is marked as delivered
          setActiveJobs(activeJobs.filter((job) => job.booking_id !== jobId));
        } else {
          // Update the status in the active jobs list
          setActiveJobs(activeJobs.map((job) =>
            job.booking_id === jobId ? { ...job, status: newStatus } : job
          ));
        }
      } else {
        console.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating job status:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      {/* Navbar for navigation */}
      <Navbar />

      <h1 className="text-4xl font-bold mb-6">Active Requests</h1>

      {/* Active Jobs Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white rounded-lg shadow-lg border-separate border border-gray-700">
          <thead>
            <tr className="bg-gray-700">
              <th className="py-3 px-4 border border-gray-600">Date & Time</th>
              <th className="py-3 px-4 border border-gray-600">Vehicle Type</th>
              <th className="py-3 px-4 border border-gray-600">Pickup Location</th>
              <th className="py-3 px-4 border border-gray-600">Dropoff Location</th>
              <th className="py-3 px-4 border border-gray-600">Status</th>
              <th className="py-3 px-4 border border-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {activeJobs.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-3 px-4 text-center border border-gray-600">No active jobs</td>
              </tr>
            ) : (
              activeJobs.map((job) => (
                <tr key={job.booking_id}>
                  <td className="py-3 px-4 border border-gray-600">{new Date(job.created_at).toLocaleString()}</td>
                  <td className="py-3 px-4 border border-gray-600">{job.vehicle_type}</td>
                  <td className="py-3 px-4 border border-gray-600">{job.pickup_location}</td>
                  <td className="py-3 px-4 border border-gray-600">{job.dropoff_location}</td>
                  <td className="py-3 px-4 border border-gray-600">
                    <select
                      value={job.status}
                      onChange={(e) => handleStatusChange(job.booking_id, e.target.value, job.vehicle_type)}
                      className="bg-gray-700 text-white p-2 border border-gray-600 rounded-lg"
                    >
                      <option value="en_route">En Route to Pickup</option>
                      <option value="goods_collected">Goods Collected</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 border border-gray-600">
                    <button
                      onClick={() => handleStatusChange(job.booking_id, 'delivered',  job.vehicle_type)}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Mark as Delivered
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveRequests;