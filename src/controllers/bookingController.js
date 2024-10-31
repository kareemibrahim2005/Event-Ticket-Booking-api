const pool = require("../db");
const queries = require("../queries/bookingQueries");

const bookTicket = async (req, res) => {
  const { email, event_id } = req.body;

  try {
    const event = await pool.query(queries.checkEvent, [event_id]);

    if (event.rows.length === 0)
      return res.status(404).json({ message: "Event not found" });

    if (event.rows[0].available_tickets > 0) {
      await pool.query(queries.bookTicket, [email, event_id]);
      await pool.query(queries.updateEvent, [event_id]);
      return res.status(201).json({ message: "Ticket booked successfully" });
    } else {
      await pool.query(queries.waitingList, [email, event_id]);
      return res
        .status(200)
        .json({ message: "You have been added to waiting list" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error booking ticket", error: error.message });
  }
};

module.exports = {
  bookTicket,
};
