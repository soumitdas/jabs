/**
 * @description Helper to modify the repsone of user document to the client
 * @param userObj {object} Mongoose user document
 * @returns {object} user response object
 */
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

/**
 * @description Custom Nodejs exception constructor
 * @param {number} statusCode HTTP status code
 * @param {string} message Exception message
 */
function HttpError(statusCode, message) {
  this.statusCode = statusCode;
  this.message = message;
}

module.exports = { userResponse, HttpError };
