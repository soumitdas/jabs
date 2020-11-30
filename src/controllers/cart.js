const { Cart } = require("../models/cart");
const Product = require("../models/product");
const { matchedData } = require("express-validator");

const getActiveCart = async (req, res, next) => {
  try {
    const { id } = req.auth;
    const cart = await Cart.findOne({ user: id, status: "active" }).exec();

    if (!cart) {
      throw Error("cart-not-found");
    }

    await cart
      .populate("items.product", "name images price offerPrice inventory")
      .execPopulate();
    // cart.calculateSubtotal();

    return res.json({
      status: "SUCCESS",
      data: cart,
      message: "cart found",
    });
  } catch (err) {
    next(err);
  }
};

const addToCart = async (req, res, next) => {
  const { id } = req.auth;
  const { productId, quantity } = matchedData(req, { locations: ["body"] });
  try {
    // Get user cart
    let cart = await Cart.findOne({ user: id, status: "active" }).exec();

    if (cart) {
      let itemIndex = cart.items.findIndex((p) => p.product == productId);

      if (itemIndex > -1) {
        //product exists in the cart, update the quantity
        cart.updateCartQty(itemIndex, quantity);
      } else {
        //product does not exists in cart, add new item
        const product = await Product.findById(productId).exec();
        if (!product) {
          throw Error(`no product found with id '${productId}'`);
        }

        cart.items.push({ product, quantity });
      }

      cart = await cart.save();
      await cart
        .populate("items.product", "name images price offerPrice inventory")
        .execPopulate();
      // cart.calculateSubtotal();

      return res.json({
        status: "SUCCESS",
        data: cart,
        message: `${productId} of Qty ${quantity} added/updated`,
      });
    } else {
      const product = await Product.findById(productId).exec();
      if (!product) {
        throw Error(`no product found with id '${productId}'`);
      }

      //no cart for user, create new cart
      const newCart = await Cart.create({
        user: id,
        items: [{ product, quantity }],
      });

      await newCart
        .populate("items.product", "name images price offerPrice inventory")
        .execPopulate();
      // newCart.calculateSubtotal();

      return res.json({
        status: "SUCCESS",
        data: newCart,
        message: `new cart created with ${productId} of Qty ${quantity}`,
      });
    }
  } catch (err) {
    next(err);
  }
};

const updateCart = async (req, res, next) => {
  const { id } = req.auth;
  const { items } = matchedData(req, { locations: ["body"] });

  //console.log(items)

  // items = [
  //   {
  //     product: {
  //       _id: "",
  //       name: "",
  //     },
  //     quantity: Number,
  //   },
  // ];

  try {
    if (!(items instanceof Array)) {
      throw Error("`items` should be an array");
    }

    let cart = await Cart.findOne({ user: id, status: "active" }).exec();

    if (!cart) {
      cart = new Cart({ user: id });
    }

    for (let i = 0; i < items.length; i++) {
      let item = items[i];

      // if the product is already in cart update quantity
      let itemIndex = cart.items.findIndex(
        (p) => p.product == item.product._id
      );

      if (itemIndex > -1) {
        //product exists in the cart, update the quantity
        cart.mergeCartQty(itemIndex, item.quantity);
      } else {
        //product does not exists in cart, add new item
        const isProduct = await Product.exists({ _id: item.product._id });
        if (!isProduct) {
          continue;
          //throw Error(`no product found with id '${item.product._id}'`);
        }

        cart.items.push({
          product: { _id: item.product._id },
          quantity: item.quantity,
        });
      }
    }

    // items.forEach(async (item) => {
    //   // if the product is already in cart update quantity
    //   let itemIndex = cart.items.findIndex(
    //     (p) => p.product == item.product._id
    //   );

    //   if (itemIndex > -1) {
    //     //product exists in the cart, update the quantity
    //     cart.mergeCartQty(itemIndex, item.quantity);
    //     console.log("item exist", item)
    //   } else {
    //     //product does not exists in cart, add new item
    //     const product = await Product.findById(item.product._id).exec();
    //     if (!product) {
    //       return;
    //       //throw Error(`no product found with id '${item.product._id}'`);
    //     }
    //     console.log("item not exists", product)
    //     cart.items.push({ product, quantity: item.quantity });
    //   }
    // });
    
    const savedCart = await cart.save();

    await savedCart
      .populate("items.product", "name images price offerPrice inventory")
      .execPopulate();
    // cart.calculateSubtotal();

    return res.json({
      status: "SUCCESS",
      data: savedCart,
      message: "cart updated",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getActiveCart, addToCart, updateCart };
