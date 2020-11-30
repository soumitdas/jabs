const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/product");

const { isSignedIn, isAdmin } = require("../middlewares/auth");
const Validator = require("../middlewares/validator");
const validationHandler = require("../middlewares/validationHandler");
const { parseProductForm } = require("../middlewares/product");

router.get("/", ProductController.getAll);
router.get("/:id", ProductController.getById);

router.use(isSignedIn, isAdmin);
router.post(
  "/",
  parseProductForm,
  Validator.newProductRoute,
  validationHandler,
  ProductController.createNew
);
router.put(
  "/:id",
  parseProductForm,
  Validator.editProductRoute,
  validationHandler,
  ProductController.updateById
);
router.delete("/:id", ProductController.deleteById);

module.exports = router;
