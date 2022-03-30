/* eslint-disable prefer-destructuring */
require('dotenv').config();

const PORT = process.env.PORT;

const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
const SMTP_LOGIN = process.env.SMTP_LOGIN;
const NODE_ENV = process.env.NODE_ENV;
const MONGODB_URI = getUriMongo(process.env.NODE_ENV);
const SECRET =
  NODE_ENV === 'test' || NODE_ENV === 'development'
    ? process.env.TEST_SECRET
    : process.env.SECRET;

module.exports = {
  PORT,
  NODE_ENV,
  MONGODB_URI,
  SECRET,
  SMTP_PASSWORD,
  SMTP_LOGIN,
};

function getUriMongo(nodeEnv) {
  switch (nodeEnv) {
    case 'development':
      return process.env.DEV_MONGODB_URI;

    case 'test':
      return process.env.TEST_MONGODB_URI;

    case 'production':
      return process.env.MONGODB_URI;

    default:
      return process.env.DEV_MONGODB_URI;
  }
}
