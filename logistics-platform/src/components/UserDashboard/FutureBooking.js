import React, { useState } from 'react';

const FutureBooking = ({ handleSubmit }) => {
  const [bookingDate, setBookingDate] = useState('');

  return (
    <div>
      <label htmlFor="bookingDate" className="text-white block">Select Future Booking Date</label>
      <input
        type="datetime-local"
        id="bookingDate"
        value={bookingDate}
        onChange={(e) => setBookingDate(e.target.value)}
        className="w-full p-3 border border-gray-600 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={() => handleSubmit(bookingDate)}
        className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200 mt-4"
      >
        Confirm Future Booking
      </button>
    </div>
  );
};

export default FutureBooking;
