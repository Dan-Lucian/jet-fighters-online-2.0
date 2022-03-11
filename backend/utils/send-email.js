const nodemailer = require('nodemailer');
const { NODE_ENV } = require('../config/env');

module.exports = sendEmail;

const configMail = {
  emailFrom: 'ulfep7oge7day5co@ethereal.email',
  optionsSmtp: {
    secure: false,
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'steve.lynch47@ethereal.email',
      pass: 'UNtfmkvPRMB98RJVG2',
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
