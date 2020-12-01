const expressJwt = require("express-jwt");
const { HttpError } = require("../utils/helper");

/**
 * @description Middleware to parse, check and verify JWT token in HTTP headers
 */
const isSignedIn = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  requestProperty: "auth",
});

/**
 * @description Middleware to check Signed-in user Admin or not
 * @param req {object} Express req object
 * @param next {function} Express next middleware callback
 * @returns {void}
 */
const isAdmin = (req, _, next) => {
  const { role } = req.auth;
  if (role === "admin") {
    return next();
  }
  next(new HttpError(401, "User must be an admin"));
};

module.exports = { isSignedIn, isAdmin };
