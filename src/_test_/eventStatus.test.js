const request = require("supertest");
const express = require("express");
const eventStatusCL = require("../controllers/eventStatusControllers");
const pool = require("../db");
const queries = require("../queries/eventStatusQueries");

const app = express();
app.use(express.json());
app.get("/status/:event_id", eventStatusCL.eventStatus);

jest.mock("../db");

describe("GET /status/:event_id", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 404 if event is not found", async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });

    const response = await request(app).get("/status/1");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Event not found" });
  });

  it("should return event status successfully", async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ available_tickets: 10 }] });
    pool.query.mockResolvedValueOnce({ rows: [{ count: 5 }] });
    pool.query.mockResolvedValueOnce({ rows: [{ count: 3 }] });

    const response = await request(app).get("/status/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      availableTickets: 10,
      bookings: 5,
      waitingList: 3,
    });
  });
});
