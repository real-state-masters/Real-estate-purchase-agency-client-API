// src/middleware/auth-middleware.js
const { auth } = require("../firebase/firebase");

async function checkAuthMiddleware(req, res, next) {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    // the authorization token is coming in as:
    // Bearer eyJhb.....
    const bearerToken = req.headers.authorization.substr(7);

    try {
      const userClaims = await auth.verifyIdToken(bearerToken);

      const { email, uid } = userClaims;

      req.user = {
        email: email,
        uid: uid,
      };

      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
}

module.exports = {
  checkAuthMiddleware: checkAuthMiddleware,
};

// const app = require("../../server"); // Link to your server file

// // eslint-disable-next-line node/no-unpublished-require
// const supertest = require("supertest");
// const request = supertest(app);
// const { checkAuthMiddleware } = require('../check-auth-middleware.js')
// describe('test authentication middleware', () => {
//     test("auth-middleware calls 'next()' function once", async () => {

//         const myMock = jest.fn();
//         const myRequest = new request;
//     await checkAuthMiddleware(myRequest, {}, myMock);
//     expect(myMock).toHaveBeenCalledTimes(1)
//     })

// })
