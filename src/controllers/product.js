const Product = require("../models/product");
const { matchedData } = require("express-validator");

//TODO: Paginate and Sort later
const getAll = async (_, res, next) => {
  try {
    const products = await Product.find().populate("category").exec();

    if (products.length < 1) {
      throw new Error("No product found");
    }

    return res.json({
      status: "SUCCESS",
      data: products,
      message: "products found",
    });
  } catch (err) {
    next(err);
  }
};
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id).populate("category").exec();

    if (!product) {
      throw new Error("Product not found");
    }

    return res.json({
      status: "SUCCESS",
      data: product,
      message: "product found",
    });
  } catch (err) {
    next(err);
  }
};

const createNew = async (req, res, next) => {
  try {
    const data = matchedData(req, { locations: ["body"] });

    if (!data.offerPrice) {
      data.offerPrice = data.price;
    }

    const product = new Product(data);

    const productDoc = await product.save();
    await productDoc.populate("category").execPopulate();

    return res.json({
      status: "SUCCESS",
      data: productDoc,
      message: "new product created",
    });
  } catch (err) {
    next(err);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = matchedData(req, { locations: ["body"] });

    if (!data.offerPrice) {
      data.offerPrice = data.price;
    }

    //TODO: merger with the new data, not replace
    const product = await Product.findByIdAndUpdate(id, data, {
      new: true,
      useFindAndModify: false,
    }).populate("category").exec();

    return res.json({
      status: "SUCCESS",
      data: product,
      message: "product updated",
    });
  } catch (err) {
    next(err);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { deletedCount } = await Product.deleteOne({ _id: id }).exec();

    if (!deletedCount) {
      throw Error("no product found to delete");
    }

    return res.json({
      status: "SUCCESS",
      data: {},
      message: "product deleted",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getById, createNew, updateById, deleteById };
