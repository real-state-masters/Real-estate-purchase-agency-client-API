const app = require("../../server"); // Link to your server file
// eslint-disable-next-line node/no-unpublished-require
const supertest = require("supertest");
const request = supertest(app);

// server.js

describe("test get endpoints", () => {
  test("get testing location", async () => {
    const res = await request.get("/location");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.any(Object));
  });
});
