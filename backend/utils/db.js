const mongoose = require('mongoose');
const Account = require('../features/accounts/account.model');
const Notification = require('../features/notifications/notification.model');
const TokenRefresh = require('../features/accounts/token-refresh.model');
const { MONGODB_URI } = require('../config/env');
const logger = require('./logger');

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    logger.prod('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

module.exports = {
  Account,
  Notification,
  TokenRefresh,
  isValidId,
};

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}
