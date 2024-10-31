const pool = require("../db");
const queries = require("../queries/cancelQueries");

const cancelTicket = async (req, res) => {
  const { email, event_id } = req.body;

  try {
    const booking = await pool.query(queries.getBookingByEmail, [
      email,
      event_id,
    ]);
    console.log(booking);

    if (booking.rows.length === 0)
      return res.status(404).json({ message: "Booking not found" });

    await pool.query(queries.cancelBooking, [booking.rows[0].id]);

    const waitingUser = await pool.query(queries.checkWaitingUser, [event_id]);

    if (waitingUser.rows.length > 0) {
      await pool.query(queries.transferNextUser, [
        waitingUser.rows[0].email,
        event_id,
      ]);
      await pool.query(queries.deleteWaitingUser, [waitingUser.rows[0].id]);
    } else {
      await pool.query(queries.updateEvent, [event_id]);
    }

    res.status(200).json({ message: "Ticket cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error cancelling ticket", error });
  }
};

module.exports = {
  cancelTicket,
};
