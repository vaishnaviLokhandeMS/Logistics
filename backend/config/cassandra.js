const cassandra = require('cassandra-driver');

// Create Cassandra client
const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],  // Update with your Cassandra instance IP address
  localDataCenter: 'datacenter1',  // Update with your data center name
  keyspace: 'logistics',  // Ensure this keyspace exists
});

// Create bookings table if it does not exist
const BookingSchema = `
CREATE TABLE IF NOT EXISTS logistics.bookings (
  booking_id UUID PRIMARY KEY,
  user_id TEXT,
  driver_id TEXT,
  pickup_location TEXT,
  dropoff_location TEXT,
  vehicle_type TEXT,  -- Add vehicle_type
  distance DOUBLE,  -- Add distance
  cost DOUBLE,  -- Add cost
  current_demand INT,  -- Add current_demand
  status TEXT,
  created_at TIMESTAMP
)
`;

const connectCassandra = async () => {
  console.log('Connecting to Cassandra...');
  try {
    // Attempt connection
    await client.connect();
    console.log('Cassandra connected');

    // Create table if it doesn't exist
    await client.execute(BookingSchema);
    console.log('Booking table created or exists');
  } catch (err) {
    console.error('Error connecting to Cassandra:', err);
    throw err;
  }
};

module.exports = { client, connectCassandra };
