const checkEvent = "SELECT * FROM Event WHERE id = $1";
const bookTicket = "INSERT INTO Booking (email, event_id) VALUES ($1, $2)";
const updateEvent =
  "UPDATE Event SET available_tickets = available_tickets - 1 WHERE id = $1";
const waitingList = "INSERT INTO Waiting (email, event_id) VALUES ($1, $2)";

module.exports = {
  checkEvent,
  bookTicket,
  updateEvent,
  waitingList,
};
