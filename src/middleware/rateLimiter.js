const rateLimit = require("express-rate-limit");

const bookingRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 50,
  message: "Too many booking attempts. Please try again later.",
});
const cancelRateLimiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 5,
  message: "Too many cancel attempts. Please try again later.",
});

const eventRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  keyGenerator: (req) => req.body.email,
  message: "Too many attempts. Please try again later.",
});

const eventStatusRateLimiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 10,
  message: "Too many booking attempts. Please try again later.",
});

module.exports = {
  bookingRateLimiter,
  cancelRateLimiter,
  eventRateLimiter,
  eventStatusRateLimiter,
};
