const redis = require('redis');
// Create a Redis client using URL from environment variables
const client = redis.createClient({ url: process.env.REDIS_URL });
// Connect to Redis
client.connect().catch(console.error);

module.exports = client;

