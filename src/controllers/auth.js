const { matchedData } = require("express-validator");
const { HttpError, userResponse } = require("../utils/helper");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/user");

const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  const { getToken } = req.query;
  const userData = matchedData(req, { locations: ["body"] });
  try {
    const user = new User(userData);
    await user.setHashedPassword();
    user.genEmailVerifyKey();

    const {
      _id,
      name,
      email,
      role,
      isEmailVerified,
      emailVerify,
    } = await user.save();
    await sendEmail.emailVerification({ id: _id, name, email, emailVerify });

    let token;
    if (getToken === "true") {
      token = jwt.sign({ id: _id, email, role }, process.env.JWT_SECRET, {
        expiresIn: "1d",
        issuer: "JABS",
      });
    }
    return res.json({
      status: "SUCCESS",
      data: {
        user: { id: _id, name, role, email, isEmailVerified },
        token,
      },
      message: "User saved successfully",
    });
  } catch (err) {
    next(err);
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password, remember } = matchedData(req, {
      locations: ["body"],
    });

    const userDoc = await User.findOne({ email }).exec();

    if (!userDoc) {
      throw new HttpError(401, "Email does not exist");
    }

    if (!(await userDoc.authenticate(password))) {
      throw new HttpError(401, "email or password not matched");
    }

    const token = jwt.sign(
      { id: userDoc._id, email: userDoc.email, role: userDoc.role },
      process.env.JWT_SECRET,
      { expiresIn: remember ? "15d" : "1d", issuer: "JABS" }
    );

    // res.cookie("token", token, { maxAge: 24 * 3600 * 1000 });

    return res.json({
      status: "SUCCESS",
      data: {
        user: userResponse(userDoc),
        token,
      },
      message: "Logged in success",
    });
  } catch (err) {
    next(err);
  }
};

const signout = (req, res) => {
  //TODO: Invalidate the token
  return res.json({
    status: "SUCCESS",
    data: {},
    message: "User signed out",
  });
};

const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = matchedData(req, {
      locations: ["body"],
    });
    const { id } = req.auth;

    const user = await User.findById(id).exec();

    if (!(await user.authenticate(oldPassword))) {
      throw new HttpError(401, "your password not matched");
    }

    user.password = newPassword;
    await user.setHashedPassword();
    await user.save();

    return res.json({
      status: "SUCCESS",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        isEmailVerified: user.isEmailVerified,
      },
      message: "Password changed successfully",
    });
  } catch (err) {
    next(err);
  }
};

const genPasswordReset = async (req, res, next) => {
  const { email } = matchedData(req, {
    locations: ["body"],
  });

  try {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      throw new HttpError(401, "user does not exist");
    }
    user.genPasswordResetKey();
    const userDoc = await user.save();
    await sendEmail.passwordReset(userDoc);

    res.json({
      status: "SUCCESS",
      data: {},
      message:
        "Password reset email has been sent, check your inbox. The link will be valid for 1 hours",
    });
  } catch (err) {
    next(err);
  }
};

const passwordReset = async (req, res, next) => {
  const { id, key, newPassword } = matchedData(req, {
    locations: ["body"],
  });
  try {
    const userDoc = await User.findById(id).exec();

    if (!userDoc) {
      throw new HttpError(401, "user does not exist");
    }

    if (!userDoc.verifyPasswordReset(key, newPassword)) {
      throw new HttpError(401, "invalid verification key");
    }
    await userDoc.setHashedPassword();
    await userDoc.save();

    res.json({
      status: "SUCCESS",
      data: {},
      message: `Password changed successfully, Sign-in to continue`,
    });
  } catch (err) {
    next(err);
  }
};

const verify = async (req, res, next) => {
  const { type, uid, key } = matchedData(req, {
    locations: ["query"],
  });

  try {
    const userDoc = await User.findById(uid).exec();

    if (!userDoc) {
      throw new HttpError(401, "user does not exist");
    }

    if (userDoc.isEmailVerified) {
      throw new HttpError(401, "email already verified");
    }
    if (!userDoc.verifyEmail(key)) {
      throw new HttpError(401, "invalid verification key");
    }

    await userDoc.save();

    res.json({
      status: "SUCCESS",
      data: {},
      message: `Hello ${userDoc.name}, Your Email is verified sucessfully\nSign-in to continue`
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signup,
  signin,
  signout,
  changePassword,
  genPasswordReset,
  passwordReset,
  verify,
};
