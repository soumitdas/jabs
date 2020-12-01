const Razorpay = require("razorpay");

/**
 * @description Payment Gateway service using Razorpay
 */
module.exports = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});
