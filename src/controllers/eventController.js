const pool = require("../db");
const queries = require("../queries/eventQueries");

const createEvent = async (req, res) => {
  const { name, total_tickets } = req.body;

  try {
    const result = await pool.query(queries.createEvent, [
      name,
      total_tickets,
      total_tickets,
    ]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Error creating event", error });
  }
};

module.exports = {
  createEvent,
};
