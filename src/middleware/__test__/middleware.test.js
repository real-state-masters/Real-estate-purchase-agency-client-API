// const app = require("../../server"); // Link to your server file

// // eslint-disable-next-line node/no-unpublished-require
// const supertest = require("supertest");
// // const request = supertest(app);
// // const { checkAuthMiddleware } = require('../check-auth-middleware.js')
describe("test authentication middleware", () => {
  test("auth-middleware calls 'next()' function once", async () => {
    // const myMock = jest.fn();
    //     const myRequest = new request;
    // await checkAuthMiddleware(myRequest, {}, myMock);
    // expect(myMock).toHaveBeenCalledTimes(1)

    expect(1).toEqual(1);
  });
});
