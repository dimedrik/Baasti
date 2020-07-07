// Load npm nodules
const config = require("config");
const nodemailer = require("nodemailer");

//Load  personal modules

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: config.get("smtp.host"),
    port: config.get("smtp.port"),
    secure: false,
    auth: {
      user: config.get("smtp.email"),
      pass: config.get("smtp.password")
    }
  });

  const message = {
    from: `${config.get("smtp.from_name")} <${config.get("smtp.from_email")}>`,
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  const info = await transporter.sendMail(message);

  console.log(`Email sent ${info.messageId}`.cyan.underline.bold);
};

module.exports = sendEmail;
