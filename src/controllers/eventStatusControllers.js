const pool = require("../db");
const queries = require("../queries/eventStatusQueries");

const eventStatus = async (req, res) => {
  const { event_id } = req.params;

  try {
    const event = await pool.query(queries.getEventById, [event_id]);
    if (event.rows.length === 0)
      return res.status(404).json({ message: "Event not found" });

    const bookings = await pool.query(queries.countBookings, [event_id]);
    const waitingList = await pool.query(queries.countWaiting, [event_id]);

    res.status(200).json({
      availableTickets: event.rows[0].available_tickets,
      bookings: parseInt(bookings.rows[0].count),
      waitingList: parseInt(waitingList.rows[0].count),
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching event status", error });
  }
};

module.exports = {
  eventStatus,
};
