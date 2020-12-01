const EmailService = require("../services/email");
const BASE_URL = process.env.FRONTEND_BASE_URL;

/**
 * @description User email verification email constructor
 * @param {object} emailObj Email object contains details
 * @returns {Promise<*>}
 */
const emailVerification = async ({ id, name, email, emailVerify }) => {
  try {
    const url = `${BASE_URL}/auth-verify?type=email&uid=${id}&key=${emailVerify.key}`;
    const emailBody = `Hi ${name}, \n\nWelcome onboard. Please use this link ${url} to verify your email.\n\nThis link will be valid upto ${emailVerify.validTill.toLocaleString()}\n\nThanks\nTeam JABS`;
    const emailSubject = "Verify your email";
    await EmailService.send(email, emailSubject, emailBody);
  } catch (err) {
    console.log(`Email send Failed: ${err.message}`);
  }
};

/**
 * @description User password reset email constructor
 * @param {object} emailObj Email object contains details
 * @returns {Promise<*>}
 */
const passwordReset = async ({ _id: id, name, email, passwordReset }) => {
  try {
    const url = `${BASE_URL}/auth-verify?type=reset-password&uid=${id}&key=${passwordReset.key}`;
    const emailBody = `Hi ${name}, \n\nPlease use this link ${url} to reset your password.\n\nThis link will be valid upto ${passwordReset.validTill.toLocaleString()}\n\nThanks\nTeam JABS`;
    const emailSubject = "Reset your password";
    await EmailService.send(email, emailSubject, emailBody);
  } catch (err) {
    console.log(`Email send Failed: ${err.message}`);
  }
};

/**
 * @description Order confirmation email constructor for COD orders
 * @param {object} emailObj Email object contains details
 * @returns {Promise<*>}
 */
const orderConfirmCOD = async ({
  _id,
  user,
  createdAt,
  totalAmount,
  status,
}) => {
  try {
    const emailBody = (emailBody = `Hi ${
      user.name
    },\n\nYour order has been successfully processed.\n\nOrder Details\n\nOrder Id: ${_id}\nDate: ${Date(
      createdAt
    ).toLocaleString()}\nStatus: ${status.toUpperCase()}\n\nPayment Details\n\n₹ ${totalAmount} to be paid using Cash on Delivery.\n\nYou will soon receive another email when your order got shipped. Thank you for shopping with us.\n\nTeam JABS`);
    const emailSubject = `Order # ${_id} has been successfully placed`;
    await EmailService.send(user.email, emailSubject, emailBody);
  } catch (err) {
    console.log(`Email send Failed: ${err.message}`);
  }
};

/**
 * @description Order confirmation email constructor for prepaid orders
 * @param {object} emailObj Email object contains details
 * @returns {Promise<*>}
 */
const orderConfirm = async ({
  _id,
  user,
  createdAt,
  totalAmount,
  status,
  payment,
}) => {
  try {
    const emailBody = `Hi ${
      user.name
    },\n\nYour order has been successfully processed.\n\nOrder Details\n\nOrder Id: ${_id}\nDate: ${Date(
      createdAt
    ).toLocaleString()}\nStatus: ${status.toUpperCase()}\n\nPayment Details\n\n₹ ${totalAmount} paid using Credit Card/Debit Card/Netbanking/UPI\nReference No: ${
      payment.reference.paymentId
    }\n\nYou will soon receive another email when your order got shipped. Thank you for shopping with us.\n\nTeam JABS`;
    const emailSubject = `Order # ${_id} has been successfully placed`;
    await EmailService.send(user.email, emailSubject, emailBody);
  } catch (err) {
    console.log(`Email send Failed: ${err.message}`);
  }
};

module.exports = {
  emailVerification,
  passwordReset,
  orderConfirm,
  orderConfirmCOD,
};
