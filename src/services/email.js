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

class EmailService {
  constructor(transporter, fromName, fromEmail) {
    this.transporter = transporter;
    this.from = `"${fromName}" <${fromEmail}>`;
  }
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
