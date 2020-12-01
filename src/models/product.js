const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    shortDescription: {
      type: String,
      maxlength: 500,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    price: {
      type: Number,
      required: true,
      maxlength: 10,
    },
    offerPrice: {
      type: Number,
      maxlength: 10,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    inventory: {
      type: Number,
    },
    images: [
      {
        type: Object,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
