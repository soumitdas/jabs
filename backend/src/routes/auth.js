const express = require("express");
const router = express.Router();

const Validator = require("../middlewares/validator");
const validationHandler = require("../middlewares/validationHandler");

const AuthController = require("../controllers/auth");
const { isSignedIn } = require("../middlewares/auth");

router.post(
  "/signup",
  Validator.signupRoute,
  validationHandler,
  AuthController.signup
);

router.post(
  "/signin",
  Validator.signinRoute,
  validationHandler,
  AuthController.signin
);

router.post(
  "/forgot-password",
  Validator.genResetPasswordRoute,
  validationHandler,
  AuthController.genPasswordReset
);
router.post(
  "/reset-password",
  Validator.passwordResetRoute,
  validationHandler,
  AuthController.passwordReset
);

router.post(
  "/change-password",
  Validator.changePasswordRoute,
  validationHandler,
  isSignedIn,
  AuthController.changePassword
);

router.get(
  "/verify",
  Validator.authVerifyRoute,
  validationHandler,
  AuthController.verify
);

router.post("/google", AuthController.googleHandler);

router.get("/signout", AuthController.signout);

module.exports = router;
