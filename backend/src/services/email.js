const nodemailer = require("nodemailer");

const smtpTransporter = nodemailer.createTransport({
  host: "smtp.zoho.in",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

/**
 * @description Email service using nodemailer package
 */
class EmailService {
  /**
   *
   * @param {*} transporter nodemailer Mail transporter
   * @param {string} fromName From Email
   * @param {string} fromEmail From Name
   */
  constructor(transporter, fromName, fromEmail) {
    this.transporter = transporter;
    this.from = `"${fromName}" <${fromEmail}>`;
  }

  /**
   *
   * @param {string} to To email
   * @param {string} subject Subject of the email
   * @param {string} text Text body of email
   * @param {string} html Html body of email
   */
  send(to, subject, text, html) {
    return this.transporter.sendMail({
      from: this.from,
      to,
      subject,
      text,
      html,
    });
  }
}

module.exports = new EmailService(smtpTransporter, "JABS", "bot@soumitdas.com");
