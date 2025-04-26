const rateLimit = require('express-rate-limit');
// Define rate limiter middleware: max 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit per IP
  message: 'Too many requests, try again later.',
});

module.exports = limiter;

