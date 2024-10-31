const request = require("supertest");
const express = require("express");
const createCL = require("../controllers/eventController");
const pool = require("../db");
const queries = require("../queries/eventQueries");

const app = express();
app.use(express.json());
app.post("/create", createCL.createEvent);

jest.mock("../db");

describe("POST /create", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create an event successfully", async () => {
    const mockEvent = { id: 1, name: "Concert", total_tickets: 100 };
    pool.query.mockResolvedValueOnce({ rows: [mockEvent] });

    const response = await request(app)
      .post("/create")
      .send({ name: "Concert", total_tickets: 100 });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockEvent);
  });
});
