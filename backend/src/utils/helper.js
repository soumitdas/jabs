const { IncomingForm } = require("formidable");

const formParse = (req, options) => {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm(options);
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err);
      }
      return resolve({ fields, files });
    });
  });
};

const userResponse = (userObj) => {
  return {
    id: userObj._id,
    name: userObj.name,
    email: userObj.email,
    //avatarURL: userObj.avatarURL,
    role: userObj.role,
    mobileNo: userObj.mobileNo,
    isEmailVerified: userObj.isEmailVerified,
    address: userObj.address,
    createdAt: userObj.createdAt,
    updatedAt: userObj.updatedAt,
  };
};

function HttpError(statusCode, message) {
  this.statusCode = statusCode;
  this.message = message;
}

module.exports = { userResponse, formParse, HttpError };
