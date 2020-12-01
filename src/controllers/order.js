const { Order } = require("../models/order");
const { matchedData } = require("express-validator");
const { Cart } = require("../models/cart");
const { HttpError } = require("../utils/helper");

const { orderConfirm, orderConfirmCOD } = require("../utils/sendEmail");

/**
 * @description Get all the orders (Admin), paginate using `page` and `limit` query
 * @param req {object} Express req object
 * @param res {object} Express res object
 * @param next {function} Express next middleware callback
 * @returns {Promise<*>}
 */
const getAllAdmin = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .limit(limit)
      .skip((page - 1) * limit)
      .sort("-createdAt")
      .exec();

    if (orders.length < 1) {
      throw new HttpError(404, "No order found");
    }

    const count = await Order.estimatedDocumentCount().exec();

    return res.json({
      status: "SUCCESS",
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      perPage: limit,
      count,
      data: orders,
      message: `${orders.length} orders found`,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @description Get order data by `orderId` (Admin)
 * @param req {object} Express req object
 * @param res {object} Express res object
 * @param next {function} Express next middleware callback
 * @returns {Promise<*>}
 */
const getByIdAdmin = async (req, res, next) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id)
      .populate("user", "name email")
      .exec();

    if (!order) {
      throw new HttpError(400, "invalid order id, no order found");
    }

    return res.json({
      status: "SUCCESS",
      data: order,
      message: "order found",
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @description Get all orders of a Signed in user
 * @param req {object} Express req object
 * @param res {object} Express res object
 * @param next {function} Express next middleware callback
 * @returns {Promise<*>}
 */
const getAll = async (req, res, next) => {
  const { id } = req.auth;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const orders = await Order.find({ user: id })
      .select("-payment.reference")
      .limit(limit)
      .skip((page - 1) * limit)
      .sort("-createdAt")
      .exec();

    if (orders.length < 1) {
      throw new HttpError(404, "No order found");
    }

    const count = await Order.estimatedDocumentCount().exec();

    return res.json({
      status: "SUCCESS",
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      perPage: limit,
      count,
      data: orders,
      message: `${orders.length} orders found`,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @description Get order data by `orderId` for a Signed-in user
 * @param req {object} Express req object
 * @param res {object} Express res object
 * @param next {function} Express next middleware callback
 * @returns {Promise<*>}
 */
const getById = async (req, res, next) => {
  const { id } = req.auth;
  const { id: orderId } = req.params;

  try {
    const order = await Order.findOne({ _id: orderId, user: id })
      .select("-payment.reference.signature")
      .exec();

    if (!order) {
      throw new HttpError(404, "no order found for the user");
    }

    return res.json({
      status: "SUCCESS",
      data: order,
      message: "order found",
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @description Initiate an Order by a Signed-in user
 * @param req {object} Express req object
 * @param res {object} Express res object
 * @param next {function} Express next middleware callback
 * @returns {Promise<*>}
 */
const initiate = async (req, res, next) => {
  const { id } = req.auth;
  const orderObj = matchedData(req, { locations: ["body"] });

  try {
    const cart = await Cart.findOne({ user: id, status: "active" })
      .populate("items.product", "name images price offerPrice")
      .exec();

    if (!cart || cart.items.length < 1) {
      throw new HttpError(404, "cart is not found");
    }

    let order = new Order({ ...orderObj, items: cart.items, user: id });
    await order.initiateOrder();

    order = await order.save();

    // Empty the cart
    cart.items = [];
    await cart.save();

    res.json({
      status: "SUCCESS",
      data: order,
      message: "Order initiated",
    });

    // COD order email
    await order.populate("user", "name email").execPopulate();
    // Email task after sending response
    await orderConfirmCOD(order);
  } catch (err) {
    next(err);
  }
};

/**
 * @description Update payment info in order data by `orderId`
 * @param req {object} Express req object
 * @param res {object} Express res object
 * @param next {function} Express next middleware callback
 * @returns {Promise<*>}
 */
const confirmPayment = async (req, res, next) => {
  const { id } = req.auth;
  const { id: orderId } = req.params;
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = matchedData(req, { locations: ["body"] });

  try {
    let order = await Order.findOne({ _id: orderId, user: id }).exec();

    if (!order) {
      throw new HttpError(400, "invalid order id, no order found");
    }

    // Check order type and if it is already verified or not
    if (
      order.payment.status !== "pending" ||
      order.status !== "payment-pending" ||
      order.payment.method === "cod"
    ) {
      throw new HttpError(403, "the order is not valid for this action");
    }

    // Verify the payment details with the PG provider
    // body: {
    //   razorpay_order_id: ,
    //   razorpay_payment_id: ,
    //   razorpay_signature:
    // }
    const isPaid = order.verifyPayment(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );
    if (!isPaid) {
      throw new HttpError(400, "payment details were tempered");
    }

    order = await order.save();

    res.json({
      status: "SUCCESS",
      data: order,
      message: "payment details verifed and payment was confirmed",
    });
    // Email task after sending response
    await order.populate("user", "name email").execPopulate();
    await orderConfirm(order);
  } catch (err) {
    next(err);
  }
};

/**
 * @description Update order processing actions in order data by `orderId`
 * @param req {object} Express req object
 * @param res {object} Express res object
 * @param next {function} Express next middleware callback
 * @returns {Promise<*>}
 */
const processOrder = async (req, res, next) => {
  const { action } = req.query;
  const { id: orderId } = req.params;

  const { shipment, remarks } = matchedData(req, { locations: ["body"] });

  try {
    const order = await Order.findById(orderId)
      .populate("user", "name email")
      .exec();

    switch (action) {
      case "approve":
        if (!order.approveOrder()) {
          throw new HttpError(403, "order cannot be approved");
        }
        break;

      case "cancel":
        if (!order.cancelOrder(remarks)) {
          throw new HttpError(403, "order cannot be cancelled");
        }
        break;

      case "shipment":
        if (!order.addShipment(shipment, remarks)) {
          throw new HttpError(403, "order cannot be shipped");
        }
        break;

      case "delivery":
        if (!order.orderDelivey(remarks)) {
          throw new HttpError(403, "order cannot be delivered");
        }
        break;
      default:
        throw new HttpError(403, "invalid action");
        break;
    }

    await order.save();

    res.json({
      status: "SUCCESS",
      data: order,
      message: `order ${action} successful`,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllAdmin,
  getByIdAdmin,
  initiate,
  confirmPayment,
  getAll,
  getById,
  processOrder,
};
