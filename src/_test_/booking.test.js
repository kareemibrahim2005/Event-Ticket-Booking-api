const request = require("supertest");
const express = require("express");
const bookingCl = require("../controllers/bookingController"); 
const pool = require("../db");


const app = express();
app.use(express.json());
app.post("/book", bookingCl.bookTicket);

jest.mock("../db"); 

describe("POST /book", () => {
  afterEach(() => {
    jest.clearAllMocks(); 
  });

  it("should return 404 if event is not found", async () => {
    pool.query.mockResolvedValueOnce({ rows: [] }); 

    const response = await request(app)
      .post("/book")
      .send({ email: "ben@gmail.com", event_id: 1 });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Event not found" });
  });

  it("should book a ticket successfully", async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ available_tickets: 1 }] });
    pool.query.mockResolvedValueOnce({}); 
    pool.query.mockResolvedValueOnce({}); 

    const response = await request(app)
      .post("/book")
      .send({ email: "ben@gmail.com", event_id: 1 });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: "Ticket booked successfully" });
  });

  it("should add to waiting list if no tickets are available", async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ available_tickets: 0 }] }); 
    pool.query.mockResolvedValueOnce({}); 

    const response = await request(app)
      .post("/book")
      .send({ email: "ben@gmail.com", event_id: 1 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "You have been added to waiting list",
    });
  });
});
