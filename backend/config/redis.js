const redis = require('redis');
const dotenv = require('dotenv');
dotenv.config();

let client;

const connectRedis = async () => {
  if (!client) {
    client = redis.createClient({
      url: process.env.REDIS_URL || 'redis://127.0.0.1:6379',  // Fallback to local Redis if REDIS_URL is undefined
    });

    client.on('connect', () => {
      console.log('Redis Connected');
    });

    client.on('error', (err) => {
      console.error('Redis Error:', err);
    });

    await client.connect();  // Await the connection
  } else {
    console.log('Redis client already connected.');
  }
};

module.exports = { connectRedis, client };
