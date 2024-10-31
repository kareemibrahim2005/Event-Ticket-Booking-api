const getEventById = "SELECT * FROM Event WHERE id = $1";
const countBookings = "SELECT COUNT(*) FROM Booking WHERE event_id = $1";
const countWaiting = "SELECT COUNT(*) FROM Waiting WHERE event_id = $1";

module.exports = {
  getEventById,
  countBookings,
  countWaiting,
};
