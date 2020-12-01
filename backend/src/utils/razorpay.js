const razorpay = require("../services/razorpay");
const crypto = require("crypto");

/**
 * @description create a order in Razorpay system and get order id
 * @param {number} amount Amount of order in INR
 * @param {string} receiptId Unique Order reference no
 * @returns {Promise<*>} response from Razorpay
 */
const createOrder = (amount, receiptId) => {
  return razorpay.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt: receiptId.toString(),
    payment_capture: true,
  });
};

/**
 * @description Helper to verify the payment
 * @param {string} orderId Razorpay Order id
 * @param {string} paymentId Razorpay Payment id
 * @param {string} signature Razorpay Signature
 * @returns {boolean} payment validation response
 */
const isPaymentLegit = (orderId, paymentId, signature) => {
  const body = `${orderId}|${paymentId}`;
  //orderId + "|" + paymentId;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body)
    .digest("hex");
  return expectedSignature === signature;
};

module.exports = { createOrder, isPaymentLegit };
