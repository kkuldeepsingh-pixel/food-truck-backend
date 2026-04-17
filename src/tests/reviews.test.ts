import request from "supertest";
import app from "../server";

describe("Reviews API", () => {

  let token: string;

  //  Get JWT before running tests
  beforeAll(async () => {
    const res = await request(app)
      .post("/login")
      .send({ username: "testuser" });

    token = res.body.token;
  });

  // GET all reviews
  it("GET /reviews should return all reviews", async () => {
    const res = await request(app).get("/reviews");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // GET filter by rating
  it("GET /reviews?rating=5 should filter reviews", async () => {
    const res = await request(app).get("/reviews?rating=5");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // GET single review
  it("GET /reviews/:id should return a single review", async () => {
    const res = await request(app).get("/reviews/1");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
  });

  // POST
  it("POST /reviews should create a review", async () => {
    const newReview = {
      truckId: 999,
      user: "TestUser",
      comment: "Amazing food",
      rating: 5,
      title: "Great",
      content: "Loved it"
    };

    const res = await request(app)
      .post("/reviews")
      .set("Authorization", `Bearer ${token}`)
      .send(newReview);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.user).toBe("TestUser");
  });

  // PUT update review 
  it("PUT /reviews/:id should update a review", async () => {
    const res = await request(app)
      .put("/reviews/1")
      .set("Authorization", `Bearer ${token}`)
      .send({
        comment: "Updated comment",
        rating: 4
      });

    expect(res.statusCode).toBe(200);
  });

  // DELETE review 
  it("DELETE /reviews/:id should delete a review", async () => {
    const res = await request(app)
      .delete("/reviews/1")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

});