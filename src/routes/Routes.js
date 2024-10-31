const express = require("express");
const bookingController = require("../controllers/bookingController");
const cancelController = require("../controllers/cancelControllers");
const eventController = require("../controllers/eventController");
const eventStatusController = require("../controllers/eventStatusControllers");
const {
  bookingRateLimiter,
  cancelRateLimiter,
  eventRateLimiter,
  eventStatusRateLimiter,
} = require("../middleware/rateLimiter");
const router = express.Router();

router.post("/book", bookingRateLimiter, bookingController.bookTicket);
router.post("/cancel", cancelRateLimiter, cancelController.cancelTicket);
router.post("/create", eventRateLimiter, eventController.createEvent);
router.get(
  "/status/:event_id",
  eventStatusRateLimiter,
  eventStatusController.eventStatus
);

module.exports = router;
