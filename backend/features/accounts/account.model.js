const mongoose = require('mongoose');

const schemaAccount = mongoose.Schema({
  email: { type: String, unique: true, required: true },
  userName: {
    type: String,
    minLength: 3,
    maxLength: 15,
    unique: true,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: { type: String, required: true },
  verificationToken: String,
  verified: Date,
  resetToken: {
    token: String,
    expires: Date,
  },
  passwordReset: Date,
  created: { type: Date, default: Date.now },
  updated: Date,
  stats: {
    total: {
      wins: { type: Number, default: 0 },
      loses: { type: Number, default: 0 },
      draws: { type: Number, default: 0 },
    },
    balanced: {
      wins: { type: Number, default: 0 },
      loses: { type: Number, default: 0 },
      draws: { type: Number, default: 0 },
    },
    speedster: {
      wins: { type: Number, default: 0 },
      loses: { type: Number, default: 0 },
      draws: { type: Number, default: 0 },
    },
    trickster: {
      wins: { type: Number, default: 0 },
      loses: { type: Number, default: 0 },
      draws: { type: Number, default: 0 },
    },
    tank: {
      wins: { type: Number, default: 0 },
      loses: { type: Number, default: 0 },
      draws: { type: Number, default: 0 },
    },
    micro: {
      wins: { type: Number, default: 0 },
      loses: { type: Number, default: 0 },
      draws: { type: Number, default: 0 },
    },
    'fast-bullet': {
      wins: { type: Number, default: 0 },
      loses: { type: Number, default: 0 },
      draws: { type: Number, default: 0 },
    },
  },
});

schemaAccount.virtual('isVerified').get(function () {
  return !!(this.verified || this.passwordReset);
});

schemaAccount.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (document, objectReturned) => {
    delete objectReturned._id;
    delete objectReturned.passwordHash;
  },
});

const Account = mongoose.model('Account', schemaAccount);

module.exports = Account;
