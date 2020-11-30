const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const CartItemSchema = new mongoose.Schema(
  {
    product: {
      type: ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity can not be less then 1"],
    },
  },
  { _id: false }
);

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
    },
    items: [CartItemSchema],
    subTotal: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["active", "abandoned", "ordered"],
      default: "active",
    },
  },
  { timestamps: true }
);

CartSchema.methods = {
  calculateSubtotal: function () {
    let subTotal = 0;
    this.items.forEach((item) => {
      subTotal += item.product.offerPrice * item.quantity;
    });
    this.subTotal = subTotal;
  },
  updateCartQty: function (itemIndex, qty) {
    // Item already exist at `itemIndex`
    // * if the quantity is 0 then delete the item
    // * quantity can be +ve or -ve to add or remove respectively
    // * after adding quantity if its less than 1 then delete the item

    this.items[itemIndex].quantity += qty;

    if (this.items[itemIndex].quantity > 7 /* max cart limit per item*/) {
      this.items[itemIndex].quantity = 7;
    }

    if (qty === 0 || this.items[itemIndex].quantity < 1) {
      this.items.splice(itemIndex, 1);
    }
  },
  mergeCartQty: function (itemIndex, qty) {
    this.items[itemIndex].quantity = qty;

    if (this.items[itemIndex].quantity > 7 /* max cart limit per item*/) {
      this.items[itemIndex].quantity = 7;
    }

    if (this.items[itemIndex].quantity < 1) {
      this.items.splice(itemIndex, 1);
    }
  },
};

module.exports = {
  Cart: mongoose.model("Cart", CartSchema),
  CartItemSchema,
};
