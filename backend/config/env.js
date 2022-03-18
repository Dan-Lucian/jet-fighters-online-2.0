/* eslint-disable prefer-destructuring */
require('dotenv').config();

const PORT = process.env.PORT;

const SENDINBLUE_PASSWORD = process.env.SENDINBLUE_PASSWORD;
const SENDINBLUE_LOGIN = process.env.SENDINBLUE_LOGIN;
const MONGODB_URI = getUriMongo(process.env.NODE_ENV);
const SECRET =
  process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development'
    ? process.env.TEST_SECRET
    : process.env.SECRET;

module.exports = {
  PORT,
  MONGODB_URI,
  SECRET,
  SENDINBLUE_PASSWORD,
  SENDINBLUE_LOGIN,
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
