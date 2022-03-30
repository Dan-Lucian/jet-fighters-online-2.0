const env = require('../config/env');

const error = (...params) => {
  console.error(...params);
};

const dev =
  env.NODE_ENV !== 'production'
    ? (...params) => {
        console.log(...params);
      }
    : () => {};

const prod = (...params) => {
  console.log(...params);
};

module.exports = {
  error,
  dev,
  prod,
};
