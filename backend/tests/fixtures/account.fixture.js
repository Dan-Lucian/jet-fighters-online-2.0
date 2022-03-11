const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const db = require('../../utils/db');
const role = require('../../utils/role');

const password = '12345678';
const passwordHash = bcrypt.hashSync(password, 10);

const accountRegistration = {
  userName: 'userName 0',
  email: 'test0@mail.com',
  password: '12345678',
  passwordConfirm: '12345678',
  role: role.Admin, // will be ignored at real registration but used when create
};

const accountUnverified = {
  _id: mongoose.Types.ObjectId(),
  userName: 'userName unverified',
  email: 'testunverified@mail.com',
  verificationToken: '1234567890',
  passwordHash,
  role: role.User,
};

const accountOne = {
  _id: mongoose.Types.ObjectId(),
  userName: 'userName 1',
  verified: Date.now(),
  email: 'test1@mail.com',
  passwordHash,
  role: role.User,
  resetToken: {
    token: 'reset-token-one',
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
};

const accountTwo = {
  _id: mongoose.Types.ObjectId(),
  userName: 'userName 2',
  verified: Date.now(),
  email: 'test2@mail.com',
  passwordHash,
  role: role.User,
  resetToken: {
    token: 'reset-token-two',
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
};

const accountTokenResetExpired = {
  ...accountTwo,
  _id: mongoose.Types.ObjectId(),
  email: 'test-expired@mail.com',
  userName: 'userName expired',
  resetToken: {
    resetToken: {
      token: 'reset-token-expired',
      expires: Date.now() - 10,
    },
  },
};

const accountAdmin = {
  _id: mongoose.Types.ObjectId(),
  userName: 'userName admin',
  verified: Date.now(),
  email: 'test-admin@mail.com',
  passwordHash,
  role: role.Admin,
  resetToken: {
    token: 'reset-token-admin',
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
};

const insertAccounts = async (accounts) => {
  await db.Account.insertMany(
    accounts.map((account) => ({ ...account, passwordHash }))
  );
};

module.exports = {
  accountRegistration,
  accountUnverified,
  accountOne,
  accountTwo,
  accountTokenResetExpired,
  accountAdmin,
  insertAccounts,
};
