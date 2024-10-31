const request = require("supertest");
const express = require("express");
const cancelCl = require("../controllers/cancelControllers");
const pool = require("../db");

const app = express();
app.use(express.json());
app.post("/cancel", cancelCl.cancelTicket);

jest.mock("../db"); 

describe("POST /cancel", () => {
  afterEach(() => {
    jest.clearAllMocks(); 
  });
  
  it("should return 404 if booking is not found", async () => {
    pool.query.mockResolvedValueOnce({ rows: [] }); 

    const response = await request(app)
      .post("/cancel")
      .send({ email: "test@example.com", event_id: 1 });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Booking not found" });
  });

  it("should cancel the ticket successfully", async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });
    pool.query.mockResolvedValueOnce({ rows: [] });
    pool.query.mockResolvedValueOnce({});
    pool.query.mockResolvedValueOnce({});

    const response = await request(app)
      .post("/cancel")
      .send({ email: "test@example.com", event_id: 1 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Ticket cancelled successfully" });
  });

  it("should transfer the next user from waiting list if available", async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] }); 
    pool.query.mockResolvedValueOnce({
      rows: [{ email: "waiting@example.com", id: 2 }],
    }); // Simulate a waiting user
    pool.query.mockResolvedValueOnce({});
    pool.query.mockResolvedValueOnce({}); 
    pool.query.mockResolvedValueOnce({}); 

    const response = await request(app)
      .post("/cancel")
      .send({ email: "test@example.com", event_id: 1 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Ticket cancelled successfully" });
  });

  it("should return 500 if an error occurs", async () => {
    const mockError = new Error("Database error");
    pool.query.mockRejectedValueOnce(mockError); 

    const response = await request(app)
      .post("/cancel")
      .send({ email: "test@example.com", event_id: 1 });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: "Error cancelling ticket",
      error: mockError,
    });
  });
});
