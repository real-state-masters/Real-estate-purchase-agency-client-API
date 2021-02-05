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
    console.log("Hello");
    next();
  }
}

module.exports = {
  checkAuthMiddleware: checkAuthMiddleware,
};
