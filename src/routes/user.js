const express = require("express");
const router = express.Router();

const Validator = require("../middlewares/validator");
const validationHandler = require("../middlewares/validationHandler");

const UserController = require("../controllers/user");
const CartController = require("../controllers/cart");
const OrderController = require("../controllers/order");

const { isSignedIn, isAdmin } = require("../middlewares/auth");

router.use(isSignedIn);

router.get("/", UserController.getUser);
router.put(
  "/",
  Validator.userUpdateRoute,
  validationHandler,
  UserController.updateUser
);

// User Cart routes
router.get("/cart", CartController.getActiveCart);
router.post(
  "/cart",
  Validator.addToCartRoute,
  validationHandler,
  CartController.addToCart
);
router.put(
  "/cart",
  Validator.updateCartRoute,
  validationHandler,
  CartController.updateCart
);

//Order routes
router.get("/orders", OrderController.getAll);
router.get("/orders/:id", OrderController.getById);

// Admin routes
router.use(isAdmin);
router.get("/all", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.put(
  "/:id",
  Validator.userUpdateRoute,
  validationHandler,
  UserController.updateUserById
);
router.delete("/:id", UserController.deleteUserById);

module.exports = router;
