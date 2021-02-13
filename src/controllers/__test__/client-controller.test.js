// eslint-disable-next-line node/no-unpublished-require

//const mongoose = require('mongoose')
const dbHandler = require("./db-handler");
const db = require("../../models");

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

describe("test client CRUD", () => {
  it("can be created correctly", () => {
    expect(
      async () =>
        await db.Client.create({
          _id: "1",
          email: "dummyemail@assembler1.com",
        }),
    ).not.toThrow();
  });

  it("can be read correctly", () => {
    expect(async () => {
      const createClient = await db.Client.create({
        _id: "2",
        email: "dummyemail@assembler2.com",
      });
      expect(createClient.email).toBe("dummyemail@assembler2.com");
    }).not.toThrow();
  });

  it("can be updated correctly", async () => {
    const createClient = await db.Client.create({
      _id: "3",
      email: "dummyemail@assembler3.com",
    });
    await db.Client.findOneAndUpdate(
      {
        _id: createClient._id,
      },
      {
        email: updatedEmail,
      },
    );

    const updated = await db.Client.findOne({
      _id: createClient._id,
    });
    expect(updated.email).toBe(updatedEmail);
  });

  it("can be deleted correctly", async () => {
    const createClient = await db.Client.create({
      _id: "4",
      email: "dummyemail@assembler4.com",
    });
    const deleted = await db.Client.findOneAndDelete(createClient._id);
    const notFound = await db.Client.findOne({
      _id: deleted._id,
    });
    expect(notFound).toBeFalsy();
  });
  const updatedEmail = "dummyemail@updated.com";
});
