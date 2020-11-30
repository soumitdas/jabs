const { validationResult } = require("express-validator");

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
