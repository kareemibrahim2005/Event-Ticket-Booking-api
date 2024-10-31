const createEvent = 'INSERT INTO Event (name, total_tickets, available_tickets) VALUES ($1, $2, $3) RETURNING *';



module.exports = {
    createEvent
}