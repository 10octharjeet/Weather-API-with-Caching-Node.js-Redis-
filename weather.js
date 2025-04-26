const axios = require('axios');
const client = require('./redisClient');


// Fetch weather data for a city, using Redis for caching
const getWeather = async (city) => {

  const cacheKey = `weather:${city.toLowerCase()}`;
  // Check if data exists in Redis
  const cached = await client.get(cacheKey);
  
  if (cached) return { data: JSON.parse(cached), source: 'cache' };
// If not cached, fetch from OpenWeatherMap API
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`;

  try {
    const response = await axios.get(url);
    // Cache the response data in Redis for 10 minutes
    await client.setEx(cacheKey, 600, JSON.stringify(response.data)); 
    return { data: response.data, source: 'api' };
  } catch (err) {
    throw new Error('Failed to fetch weather data'); // Handle specific error message
  }
};

module.exports = getWeather;

