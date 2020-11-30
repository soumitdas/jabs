const Category = require("../models/category");
const { matchedData } = require("express-validator");

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id).exec();

    if (!category) {
      throw new Error("Category not found");
    }
    return res.json({
      status: "SUCCESS",
      data: category,
      message: "category found",
    });
  } catch (err) {
    next(err);
  }
};
const getAll = async (_, res, next) => {
  // TODO: Paginate and Sort
  try {
    const categories = await Category.find().exec();

    if (categories.length < 1) {
      throw new Error("No category found");
    }

    return res.json({
      status: "SUCCESS",
      data: categories,
      message: "categories found",
    });
  } catch (err) {
    next(err);
  }
};
const updateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = matchedData(req, { locations: ["body"] });

    const category = await Category.findByIdAndUpdate(id, data, {
      new: true,
      useFindAndModify: false,
    }).exec();

    return res.json({
      status: "SUCCESS",
      data: category,
      message: "category updated successfully",
    });
  } catch (err) {
    next(err);
  }
};
const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { deletedCount } = await Category.deleteOne({ _id: id }).exec();

    if (!deletedCount) {
      throw Error("no category found to delete");
    }

    return res.json({
      status: "SUCCESS",
      data: {},
      message: "category deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

const createNew = async (req, res, next) => {
  try {
    const data = matchedData(req, { locations: ["body"] });

    const category = new Category(data);

    const categoryDoc = await category.save();

    return res.json({
      status: "SUCCESS",
      data: categoryDoc,
      message: "category created successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getById, getAll, updateById, deleteById, createNew };
