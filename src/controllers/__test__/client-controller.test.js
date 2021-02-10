// eslint-disable-next-line node/no-unpublished-require

//const mongoose = require('mongoose')
const dbHandler = require("./db-handler");

const db = require("../../models");

beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

describe("test client CRUD", () => {
  it("can be created correctly", async () => {
    expect(async () => await db.Client.create(testClient)).not.toThrow();
  });
});

const testClient = {
  _id: "5shn9Ht2W8WN6Hc1BUcNi35H4bg7",
  email: " dummyEmail@gmail.com",
};

//const updateEmail = 'dummyEmail2@gmail.com';
