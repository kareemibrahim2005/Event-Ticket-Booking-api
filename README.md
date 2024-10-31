# Event Booking API

This is an event booking API built using Node.js and Express. It allows users to book tickets for events using their email address, with rate limiting applied to prevent abuse.

## Features

- Booking Endpoint: Allows users to book events by providing an email.

- Cancel Endpoint: Allows users to cancel a booked or waiting ticket.

- Rate Limiting: Limits the number of bookings per user within a specific time frame to prevent excessive requests.

## Technologies Used

- Node.js

- Express.js

- PostgreSQL

- express-rate-limit for rate limiting

## Getting Started

These instructions will help you set up and run the project locally.

## Installation

1. Clone the Repository

```
git clone https://github.com/your-username/event-booking-api.git

cd event-booking-api
```

2. Install Dependencies

```
npm install dotenv express express-rate-limit node nodemon pg
```

3. Configure Environment Variables

Create a `.env` file in the root directory and set up the following variables:

```
PORT=7070
DATABASE_URL=postgresql://ibrahim:2CFUuE3rSwNLJzcPkRZGHrIPKBOWeLy2@dpg-cs8eede8ii6s73c9jjn0-a.oregon-postgres.render.com/test5_init
```

Note: This db url is provided for testing purposes and is only active for 12 days

4. Run the Application

```
npm start
```

The API should now be running on `http://localhost:7070`.

## API Endpoints

#### Booking Endpoint:

Allows users to book a ticket for an event.

```
URL: /api/book

Method: POST

Request Body:

{
"email": "user@example.com",
"event_id": "123"
}

Response:

Success (200 OK):

{
"message": "Booking confirmed!"
}

Rate Limit Exceeded (429 Too Many Requests):

{
"message": "Too many booking attempts. Please try again later."
}
```

#### Cancel Endpoint.

Allows users to cancel booked or waiting ticket event.

```
URL: /api/cancel

Method: POST

Request Body:

{
"email": "user@example.com",
"event_id": "123"
}

Response:

Success (200 OK):

{
"message": "Ticket cancelled successfully"
}

Rate Limit Exceeded (429 Too Many Requests):

{
"message": "Too many attempts. Please try again later."
}
```

#### Event Endpoint.

Allows users to add event and total tickets to the event.

```
URL: /api/create

Method: POST

Request Body:

{
"name": "event_name",
"total_tickets": "100"
}

Response:

Success (200 OK):

{
"message": "{
"id": 3,
"name": "event_name",
"total_tickets": 100,
"available_tickets": 100
}"

}

Rate Limit Exceeded (429 Too Many Requests):

{
"message": "Too many attempts. Please try again later."
}
```

#### Event Status Endpoint.

Allows users to get the result of the total tickets, booked user and waiting user of a specific event.

```
URL: /api/Status/:event_id

Method: get

Request Body:

event_id

Response:

Success (200 OK):

{
"message": "{
"availableTickets": 1,
"bookings": 0,
"waitingList": 0
}"

}

Rate Limit Exceeded (429 Too Many Requests):

{
"message": "Too many attempts. Please try again later."
}
```

## Design Choice

I made use of modular or feature-based structure for this projest. This structure supports scalability and maintainability, as each feature has a file for each controllers, queries, routes, and tests, making the code organized and developer-friendly.

## Test Instruction

- Start the server using `npm start` in your terminal.
- To test all the controller, queries and routes you'll use `npm test`.

## Project Structure

```
event-ticket-booking-api/
├── src
| ├──*test*
| | ├── booking.test.js
| | ├── cancel.test.js
| | ├── event.test.js
| | └── eventStatus.test.js
| |
| ├── _controllers_
| | ├── bookingControllers.js
| | ├── cancelControllers.js
| | ├── eventControllers.js
| | └── eventStatusController.js
| |
| ├── _middleware_
| | └── rateLimiter.js
| |
| ├── _queries_
| | ├── bookingQueries.js
| | ├── cancelQueries.js
| | ├── eventQueries.js
| | └── eventStatusQueries.js
| |
| ├── _routes_
| | ├── bookingRoutes.js
| | ├── cancelRoutes.js
| | ├── eventRoutes.js
| | └── eventStatusRoutes.js

```

## Test-Driven Development (TDD)

I made use of jest and super test for all unit or endpoint testing and I archieved a test coverage of 89%.
