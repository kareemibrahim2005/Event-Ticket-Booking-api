const getBookingByEmail =
  "SELECT * FROM Booking WHERE email = $1 AND event_id = $2";
const cancelBooking = "DELETE FROM Booking WHERE id = $1";
const checkWaitingUser =
  "SELECT * FROM Waiting WHERE event_id = $1 ORDER BY id LIMIT 1";
const transferNextUser =
  "INSERT INTO Booking (email, event_id) VALUES ($1, $2)";
const deleteWaitingUser = "DELETE FROM Waiting WHERE id = $1";
const updateEvent =
  "UPDATE Event SET available_tickets = available_tickets + 1 WHERE id = $1";

module.exports = {
  getBookingByEmail,
  cancelBooking,
  checkWaitingUser,
  transferNextUser,
  deleteWaitingUser,
  updateEvent,
};
