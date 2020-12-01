const { validationResult } = require("express-validator");

/**
 * @description Catch error from express-validator middlewere and send error response to client
 * @param req {object} Express req object
 * @param res {object} Express res object
 * @param next {function} Express next middleware callback
 * @returns {void}
 */
module.exports = (req, res, next) => {
  const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
    // Build your resulting errors however you want! String, object, whatever - it works!
    return `${param}: ${msg}`;
  };

  const result = validationResult(req).formatWith(errorFormatter);

  if (result.isEmpty()) {
    return next();
  }

  let errMessage = "Errors: ";
  result.errors.forEach((error) => {
    const temp = `\`${error.param}\`: ${error.msg}`;
    errMessage += temp + "\n";
  });

  return res.status(422).json({
    status: "ERROR",
    errors: result.errors,
    data: {},
    message: errMessage,
  });
};
