/// Load environment variables from .env file
require('dotenv').config();
const express = require('express');
const getWeather = require('./weather');
const limiter = require('./rateLimiter');

const app = express();
const PORT = process.env.PORT || 3000;
// Apply rate limiter middleware to all requests
app.use(limiter);

app.use(express.json())
app.get('/weather/:city', async (req, res) => {
  try {
    const result = await getWeather(req.params.city);
    res.json(result); // Respond with data if no error
    
  } 
  // Error handling: If something goes wrong, send a 500 status code
  catch (err) {
    console.error(err.message);  // Log the error for debugging
    res.status(500).json({ error: err.message }); // Send error response
  }
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

