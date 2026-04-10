import request from "supertest";
import app from "../server";

describe("Reviews API", () => {
  it("GET /reviews should return all reviews", async () => {
    const res = await request(app).get("/reviews");
    expect(res.statusCode).toBe(200);
  });

  it("GET /reviews?rating=5 should filter reviews", async () => {
    const res = await request(app).get("/reviews?rating=5");
    expect(res.statusCode).toBe(200);
  });
});