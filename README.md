# Weather API with Caching (Node.js + Redis)

This project builds a simple Weather API that fetches weather data from the OpenWeatherMap API and caches it using Redis for faster performance.

## Features
- Fetch current weather data for a city.
- Caches the weather data for 10 minutes in Redis.
- Rate limiting to avoid API spamming.
- Basic error handling for API and server errors.

---
## Tech Stack
* Node.js
* Express.js
* Redis
* Axios
* express-rate-limit
* dotenv

## Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/10octharjeet/Weather-API-with-Caching-Node.js-Redis-.git
cd Weather-API-with-Caching-Node.js-Redis-
```
2. ***Install Dependencies**
```bash
npm install
```
3. ***Set up environment variables**
```bash
PORT=3000
REDIS_URL=redis://localhost:6379
OPENWEATHER_API_KEY=your_openweathermap_api_key_here
```
4. ***Run Redis using Docker**
```bash
docker run --name redis-server -p 6379:6379 -d redis
```
5. ***Start the server**
```bash
node server.js
```
---
## Redis Setup notes (Using Docker)

If you don't have Redis installed locally, you can run it easily using Docker:

1. Make sure Docker is installed and running.

2. In your project folder, create a file 'docker-compose.yml' with:

```bash
services:
  redis:
    image: redis
    ports:
      - "6379:6379"
```
3. Start Redis container:
```bash
docker-compose up -d
```
4. Redis will be available at redis://localhost:6379.

## API Endpoints
Method | Endpoint | Description
GET | /weather/:city | Get current weather by city name

## Error Handling
* If OpenWeatherMap API fails, a 500 error is returned with an error message.
* Logs errors to console for debugging.

## Rate Limiting
* Max 100 requests per 15 minutes per IP address.

## Redis Caching
* Weather data is cached in Redis with a TTL (Time to Live) of 10 minutes.
* Key format: weather:cityname
* Reduces external API calls and improves performance.