const mongoose = require("mongoose");

const config = require("../../config");

const connect = require("../connect");

jest.mock("mongoose", () => ({
  connect: jest.fn(),
}));

describe("mongoose schemas", () => {
  test("the `connect` function calls `mongoose.connect` with the url and options", async () => {
    await connect();
    expect(mongoose.connect.mock.calls[0][0]).toBe(config.db.url);
    expect(mongoose.connect.mock.calls[0][1]).toEqual(expect.any(Object));
  });
});
