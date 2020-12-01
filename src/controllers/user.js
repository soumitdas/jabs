const User = require("../models/user");
const { matchedData } = require("express-validator");
const { userResponse } = require("../utils/helper");
const { HttpError } = require("../utils/helper");

/**
 * @description Get user data by `userId`
 * @param req {object} Express req object
 * @param res {object} Express res object
 * @param next {function} Express next middleware callback
 * @returns {Promise<*>}
 */
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).exec();

    if (!user) {
      throw new HttpError(404, "User not found");
    }

    return res.json({
      status: "SUCCESS",
      data: userResponse(user),
      message: "User found",
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @description Get user data of a Signed-in user
 * @param req {object} Express req object
 * @param res {object} Express res object
 * @param next {function} Express next middleware callback
 * @returns {Promise<*>}
 */
const getUser = async (req, res, next) => {
  try {
    const { id } = req.auth;

    const user = await User.findById(id).exec();

    if (!user) {
      throw new HttpError(404, "User not found");
    }

    return res.json({
      status: "SUCCESS",
      data: userResponse(user),
      message: "User details",
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @description Get all users data (Admin) *TODO: paginate & sort*
 * @param req {object} Express req object
 * @param res {object} Express res object
 * @param next {function} Express next middleware callback
 * @returns {Promise<*>}
 */
const getAllUsers = async (req, res, next) => {
  try {
    // const { type } = req.query;
    // const role = type === "customer" || "seller" || "admin" ? type : undefined;

    const users = await User.find({
      /*role*/
    }).exec();

    if (users.length < 1) {
      throw new HttpError(404, "No User found");
    }

    return res.json({
      status: "SUCCESS",
      data: users.map((user) => userResponse(user)),
      message: "All the users",
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @description Update user data of a Signed-in user
 * @param req {object} Express req object
 * @param res {object} Express res object
 * @param next {function} Express next middleware callback
 * @returns {Promise<*>}
 */
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.auth;
    const data = matchedData(req, { locations: ["body"] });

    const user = await User.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, useFindAndModify: false }
    ).exec();

    return res.json({
      status: "SUCCESS",
      data: userResponse(user),
      message: "User details updated",
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @description Update user data by `userId` (Admin)
 * @param req {object} Express req object
 * @param res {object} Express res object
 * @param next {function} Express next middleware callback
 * @returns {Promise<*>}
 */
const updateUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = matchedData(req, { locations: ["body"] });

    const user = await User.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, useFindAndModify: false }
    ).exec();

    return res.json({
      status: "SUCCESS",
      data: userResponse(user),
      message: "User details updated",
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @description Delete user by `userId` (Admin)
 * @param req {object} Express req object
 * @param res {object} Express res object
 * @param next {function} Express next middleware callback
 * @returns {Promise<*>}
 */
const deleteUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.auth.id === id) {
      throw new HttpError(403, "User cannot delete himself");
    }

    const { deletedCount } = await User.deleteOne({ _id: id }).exec();

    if (!deletedCount) {
      throw new HttpError(404, "no user found to delete");
    }

    return res.json({
      status: "SUCCESS",
      data: {},
      message: "user deleted",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUserById,
  getUser,
  getAllUsers,
  updateUser,
  updateUserById,
  deleteUserById,
};
