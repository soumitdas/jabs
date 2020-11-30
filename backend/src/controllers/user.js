const User = require("../models/user");
const { matchedData } = require("express-validator");
const { userResponse } = require("../utils/helper");

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).exec();

    if (!user) {
      throw new Error("User not found");
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

const getUser = async (req, res, next) => {
  try {
    const { id } = req.auth;

    const user = await User.findById(id).exec();

    if (!user) {
      throw new Error("User not found");
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

const getAllUsers = async (req, res, next) => {
  try {
    const { type } = req.query;
    const role = type === "customer" || "seller" || "admin" ? type : undefined;

    const users = await User.find({ /*role*/ }).exec();

    if (users.length < 1) {
      throw new Error("No User found");
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

const deleteUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { deletedCount } = await User.deleteOne({ _id: id }).exec();

    if (!deletedCount) {
      throw Error("no user found to delete");
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
