const nodemailer = require('nodemailer');
const { NODE_ENV, SMTP_PASSWORD, SMTP_LOGIN } = require('../config/env');

module.exports = sendEmail;

const configMail = {
  emailFrom: SMTP_LOGIN,
  optionsSmtp: {
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    auth: {
      user: SMTP_LOGIN,
      pass: SMTP_PASSWORD,
    },
  },
};

async function sendEmail({ to, subject, html, from = configMail.emailFrom }) {
  if (NODE_ENV === 'test') {
    console.log(`SENDING EMAIL: ${subject}`);
    return;
  }

  const transporter = nodemailer.createTransport(configMail.optionsSmtp);
  await transporter.sendMail({ from, to, subject, html });
}
