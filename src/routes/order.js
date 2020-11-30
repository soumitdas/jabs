const express = require("express");
const router = express.Router();

const { isSignedIn, isAdmin } = require("../middlewares/auth");
const Validator = require("../middlewares/validator");
const validationHandler = require("../middlewares/validationHandler");
const OrderController = require("../controllers/order");

router.use(isSignedIn);
router.post(
  "/",
  Validator.initOrderRoute,
  validationHandler,
  OrderController.initiate
);
router.post(
  "/:id/confirm-payment",
  Validator.confirmPaymentRoute,
  validationHandler,
  OrderController.confirmPayment
);

router.use(isAdmin);
router.get("/", OrderController.getAllAdmin);
router.get("/:id", OrderController.getByIdAdmin);
router.patch(
  "/:id",
  Validator.processOrderRoute,
  validationHandler,
  OrderController.processOrder
);

module.exports = router;
