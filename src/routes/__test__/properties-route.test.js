const app = require("../../server");
// eslint-disable-next-line node/no-unpublished-require
const supertest = require("supertest");
const request = supertest(app);

describe("endpoints in properties router , method:GET", () => {
  test("get properties by location", async () => {
    const res = await request.get("/location/barcelona");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.any(Object));
  });

  test("get all properties", async () => {
    const res = await request.get("/properties");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.error).toBeNull();
  });

  test("get one property", async () => {
    const res = await request.get("/properties/16128835346022a64ebbc51");
    const keys = Object.keys(res.body.data.data);
    const { props } = require("./utils");

    expect(res.status).toBe(200);
    expect(res.body.error).toBeNull();
    expect(keys).toEqual(expect.arrayContaining(props));
  });
});
