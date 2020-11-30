const razorpay = require("../services/razorpay");
const crypto = require("crypto");

const createOrder = (amount, receiptId) => {
  return razorpay.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt: receiptId.toString(),
    payment_capture: true,
  });
};

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
