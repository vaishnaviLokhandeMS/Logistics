import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';  // Import the common Navbar
import { fetchCompletedJobs } from './fetchDriverData';  // API call to fetch completed jobs

const CompletedRequests = () => {
  const [completedJobs, setCompletedJobs] = useState([]); // State to hold completed jobs
  const driverId = localStorage.getItem('driverId');  // Retrieve driver ID from local storage

  // Fetch data when the component mounts
  useEffect(() => {
    if (driverId) {
      fetchCompletedJobs(setCompletedJobs, driverId);  // Fetch completed jobs
    }
  }, [driverId]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      {/* Navbar for navigation */}
      <Navbar />

      <h1 className="text-4xl font-bold mb-6">Completed Requests</h1>

      {/* Completed Jobs Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white rounded-lg shadow-lg border-separate border border-gray-700">
          <thead>
            <tr className="bg-gray-700">
              <th className="py-3 px-4 border border-gray-600">Date & Time</th>
              <th className="py-3 px-4 border border-gray-600">Pickup Location</th>
              <th className="py-3 px-4 border border-gray-600">Dropoff Location</th>
              <th className="py-3 px-4 border border-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {completedJobs.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-3 px-4 text-center border border-gray-600">No completed jobs</td>
              </tr>
            ) : (
              completedJobs.map((job) => (
                <tr key={job.booking_id}>
                  <td className="py-3 px-4 border border-gray-600">{new Date(job.created_at).toLocaleString()}</td>
                  <td className="py-3 px-4 border border-gray-600">{job.pickup_location}</td>
                  <td className="py-3 px-4 border border-gray-600">{job.dropoff_location}</td>
                  <td className="py-3 px-4 border border-gray-600">{job.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedRequests;
