const express = require("express");
const router = express.Router();

const CategoryController = require("../controllers/category");
const { isSignedIn, isAdmin } = require("../middlewares/auth");
const Validator = require("../middlewares/validator");
const validationHandler = require("../middlewares/validationHandler");

router.get("/", CategoryController.getAll);
router.get("/:id", CategoryController.getById);

router.use(isSignedIn, isAdmin);
router.post(
  "/",
  Validator.newCategoryRoute,
  validationHandler,
  CategoryController.createNew
);
router.put(
  "/:id",
  Validator.newCategoryRoute,
  validationHandler,
  CategoryController.updateById
);
router.delete("/:id", CategoryController.deleteById);

module.exports = router;
