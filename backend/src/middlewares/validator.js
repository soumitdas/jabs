const { check } = require("express-validator");

const signupRoute = [
  check("name")
    .exists()
    .bail()
    .isString()
    .isLength({ min: 3, max: 25 })
    .withMessage("invalid name"),
  check("email").exists().bail().isEmail().withMessage("invalid email"),
  check("password")
    .exists()
    .bail()
    .isString()
    .isLength({ min: 5, max: 100 })
    .withMessage("invalid password format"),
];

const signinRoute = [
  check("email").exists().bail().isEmail().withMessage("invalid email"),
  check("password")
    .exists()
    .bail()
    .isString()
    .isLength({ min: 5, max: 100 })
    .withMessage("invalid password format"),
  check("remember")
    .optional()
    .isBoolean()
    .withMessage("remember should be boolean"),
];

const changePasswordRoute = [
  check("oldPassword")
    .exists()
    .bail()
    .isString()
    .isLength({ min: 5, max: 100 })
    .withMessage("invalid oldPassword format"),
  check("newPassword")
    .exists()
    .bail()
    .isString()
    .isLength({ min: 5, max: 100 })
    .withMessage("invalid newPassword format"),
];

const genResetPasswordRoute = [
  check("email").exists().bail().isEmail().withMessage("invalid email"),
];

const passwordResetRoute = [
  check("id").exists().bail().isMongoId().withMessage("invalid id"),
  check("key").exists().bail().isHexadecimal().withMessage("invalid key"),
  check("newPassword")
    .exists()
    .bail()
    .isString()
    .isLength({ min: 5, max: 100 })
    .withMessage("invalid password format"),
];

const authVerifyRoute = [
  check("type")
    .exists()
    .bail()
    .isAlpha()
    .isIn(["email", "passwordReset"])
    .withMessage("invalid type"),
  check("uid").exists().bail().isMongoId().withMessage("invalid uid"),
  check("key").exists().bail().isHexadecimal().withMessage("invalid key"),
];

const userUpdateRoute = [
  check("name")
    .exists()
    .bail()
    .isString()
    .isLength({ min: 3, max: 25 })
    .withMessage("invalid name"),
];

const newCategoryRoute = [
  check("name")
    .exists()
    .bail()
    .isString()
    .isLength({ min: 2, max: 25 })
    .withMessage("invalid category name"),
  check("slug").exists().isSlug().withMessage("invalid slug"),
];

const newProductRoute = [
  check("name")
    .exists()
    .bail()
    .isString()
    .isLength({ min: 2, max: 100 })
    .withMessage("invalid product name"),
  check("shortDescription")
    .optional()
    .isLength({ min: 10, max: 500 })
    .withMessage("invalid product short description"),
  check("description")
    .exists()
    .bail()
    .isLength({ min: 10, max: 2000 })
    .withMessage("invalid product description"),
  check("category")
    .exists()
    .bail()
    .isMongoId()
    .withMessage("invalid product category id"),
  check("price")
    .exists()
    .bail()
    .isNumeric()
    .isLength({ max: 10 })
    .withMessage("invalid product price"),
  check("offerPrice")
    .optional()
    .isNumeric()
    .isLength({ max: 10 })
    .withMessage("invalid product offer price"),
  check("inventory")
    .optional()
    .isNumeric()
    .withMessage("invalid product inventory"),
  check("images").optional().isArray().withMessage("invalid attached images"),
];
const editProductRoute = [
  check("name")
    .exists()
    .bail()
    .isString()
    .isLength({ min: 2, max: 100 })
    .withMessage("invalid product name"),
  check("shortDescription")
    .optional()
    .isLength({ min: 10, max: 500 })
    .withMessage("invalid product short description"),
  check("description")
    .exists()
    .bail()
    .isLength({ min: 10, max: 2000 })
    .withMessage("invalid product description"),
  check("category")
    .exists()
    .bail()
    .isMongoId()
    .withMessage("invalid product category id"),
  check("price")
    .exists()
    .bail()
    .isNumeric()
    .isLength({ max: 10 })
    .withMessage("invalid product price"),
  check("offerPrice")
    .optional()
    .isNumeric()
    .isLength({ max: 10 })
    .withMessage("invalid product offer price"),
  check("inventory")
    .optional()
    .isNumeric()
    .withMessage("invalid product inventory"),
  check("images").optional().isArray().withMessage("invalid attached images"),
];

const addToCartRoute = [
  check("productId")
    .exists()
    .bail()
    .isMongoId()
    .withMessage("invalid productId"),
  check("quantity").exists().bail().isNumeric().withMessage("invalid quantity"),
];

const updateCartRoute = [
  check("items.*.product._id")
    .exists()
    .bail()
    .isMongoId()
    .withMessage("invalid productId"),
  check("items.*.quantity")
    .exists()
    .bail()
    .isNumeric()
    .withMessage("invalid quantity"),
];

const initOrderRoute = [
  check("shipping").exists().bail(),
  //check("items").exists().bail().isArray().withMessage("invalid items[]"),
  check("payment.method")
    .exists()
    .bail()
    .isString()
    .withMessage("invalid payment method"),
];

const confirmPaymentRoute = [
  check("razorpay_order_id").exists().bail().isString(),
  check("razorpay_payment_id").exists().bail().isString(),
  check("razorpay_signature").exists().bail().isString(),
];

const processOrderRoute = [
  check("remarks").optional().isString(),
  check("shipment.provider").optional().isString(),
  check("shipment.trackingId").optional().isString(),
];

module.exports = {
  signupRoute,
  signinRoute,
  changePasswordRoute,
  genResetPasswordRoute,
  passwordResetRoute,
  authVerifyRoute,
  userUpdateRoute,
  newCategoryRoute,
  newProductRoute,
  editProductRoute,
  addToCartRoute,
  updateCartRoute,
  initOrderRoute,
  confirmPaymentRoute,
  processOrderRoute,
};
