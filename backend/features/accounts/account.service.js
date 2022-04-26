/* eslint-disable no-shadow */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const sendEmail = require('../../utils/send-email');
const Role = require('../../utils/role');
const { SECRET } = require('../../config/env');
const db = require('../../utils/db');

module.exports = {
  register,
  verifyEmail,
  authenticate,
  refreshToken,
  revokeToken,
  forgotPassword,
  validateResetToken,
  resetPassword,
  getAll,
  getByUserName,
  getManyByUserName,
  getByUserNameForStranger,
  create,
  update,
  delete: _delete,
};

async function register(params, origin) {
  // validate
  if (await db.Account.findOne({ email: params.email })) {
    await sendEmailAlreadyRegistered(params.email, origin);
    throw `email already registered`;
  }

  if (await db.Account.findOne({ userName: params.userName })) {
    throw `userName already registered`;
  }

  // create account object
  const account = new db.Account(params);

  // first registered account is an admin
  const isFirstAccount = (await db.Account.countDocuments({})) === 0;
  account.role = isFirstAccount ? Role.Admin : Role.User;
  account.verificationToken = getStringRandomForToken();

  // hash password
  account.passwordHash = await hash(params.password);

  // save account
  await account.save();

  // send email
  await sendEmailVerification(account, origin);
}

async function verifyEmail({ token }) {
  const account = await db.Account.findOne({ verificationToken: token });

  if (!account) throw 'Verification failed';

  account.verified = Date.now();
  account.verificationToken = undefined;
  await account.save();

  return account;
}

async function authenticate({ email, password, ipAddress }) {
  const account = await db.Account.findOne({ email });
  if (!account) throw 'Incorrect email or password';

  const isHashExact = await bcrypt.compare(password, account.passwordHash);

  if (!account.isVerified || !isHashExact) {
    throw 'Incorrect email or password';
  }

  // authentication successful so generate jwt and refresh tokens
  const tokenJwt = generateTokenJwt(account);
  const tokenRefresh = generateTokenRefresh(account, ipAddress);

  // save refresh token
  await tokenRefresh.save();

  // return basic details and tokens
  return {
    ...getDetailsBasic(account),
    tokenJwt,
    tokenRefresh: tokenRefresh.token,
  };
}

async function refreshToken({ tokenRefreshReceived, ipAddress }) {
  const tokenRefresh = await getTokenRefreshFromDb(tokenRefreshReceived);
  const { account } = tokenRefresh;

  // replace old refresh token with a new one and save
  const tokenRefreshNew = generateTokenRefresh(account, ipAddress);
  tokenRefresh.revoked = Date.now();
  tokenRefresh.revokedByIp = ipAddress;
  tokenRefresh.replacedByToken = tokenRefreshNew.token;
  await tokenRefresh.save();
  await tokenRefreshNew.save();

  // generate new jwt
  const tokenJwt = generateTokenJwt(account);

  // return basic details and tokens
  return {
    ...getDetailsBasic(account),
    tokenJwt,
    tokenRefresh: tokenRefreshNew.token,
  };
}

async function revokeToken({ tokenRefresh, ipAddress }) {
  const tokenRefreshFound = await getTokenRefreshFromDb(tokenRefresh);

  // revoke token and save
  tokenRefreshFound.revoked = Date.now();
  tokenRefreshFound.revokedByIp = ipAddress;
  await tokenRefreshFound.save();
}

async function forgotPassword({ email }, origin) {
  const account = await db.Account.findOne({ email });

  // always return ok response to prevent email enumeration
  if (!account) return;

  // create reset token that expires after 24 hours
  account.resetToken = {
    token: getStringRandomForToken(),
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  };
  await account.save();

  // send email
  await sendEmailResetPassword(account, origin);
}

async function validateResetToken({ token }) {
  const account = await db.Account.findOne({
    'resetToken.token': token,
    'resetToken.expires': { $gt: Date.now() },
  });

  if (!account) throw 'invalid token';
}

async function resetPassword({ token, password }) {
  const account = await db.Account.findOne({
    'resetToken.token': token,
    'resetToken.expires': { $gt: Date.now() },
  });

  if (!account) throw 'invalid token';

  // update password and remove reset token
  account.passwordHash = await hash(password);
  account.passwordReset = Date.now();
  account.resetToken = undefined;
  await account.save();
}

async function getAll() {
  const accounts = await db.Account.find();
  return accounts.map((x) => getDetailsBasic(x));
}

async function getByUserName(userName) {
  const account = await getAccountByUserName(userName);
  return getDetailsBasic(account);
}

async function getManyByUserName(userName) {
  const accounts = await getManyAccountsByUsername(userName);
  return getDetailsBasicFromMany(accounts);
}

async function getByUserNameForStranger(userName) {
  const account = await getAccountByUserName(userName);
  return getDetailsBasicForStranger(account);
}

async function create(params) {
  // validate
  if (await db.Account.findOne({ email: params.email })) {
    throw `email "${params.email}" is already registered`;
  }

  if (await db.Account.findOne({ userName: params.userName })) {
    throw `username "${params.userName}" is already taken`;
  }

  const account = new db.Account(params);
  account.verified = Date.now();

  // hash password
  account.passwordHash = await hash(params.password);

  // save account
  await account.save();

  return getDetailsBasic(account);
}

async function update(userName, params) {
  const account = await getAccountByUserName(userName);

  // validate (if email was changed)
  if (
    params.email &&
    account.email !== params.email &&
    (await db.Account.findOne({ email: params.email }))
  ) {
    throw `email "${params.email}" is already taken`;
  }

  // validate (if userName was changed)
  if (
    params.userName &&
    account.userName !== params.userName &&
    (await db.Account.findOne({ userName: params.userName }))
  ) {
    throw `username "${params.userName}" is already taken`;
  }

  // hash password if it was entered
  if (params.password) {
    params.passwordHash = await hash(params.password);
  }

  // copy params to account and save
  Object.assign(account, params);
  account.updated = Date.now();
  await account.save();

  return getDetailsBasic(account);
}

async function _delete(userName) {
  const account = await getAccountByUserName(userName);
  await account.remove();
}

// helper functions

async function getAccountByUserName(userName) {
  if (!userName) throw 'account not found';
  const account = await db.Account.findOne({ userName });
  if (!account) throw 'account not found';
  return account;
}

async function getManyAccountsByUsername(userName) {
  if (!userName) throw 'account not found';

  const regexp = new RegExp(userName, 'i');
  const accounts = await db.Account.find({ userName: regexp })
    .sort({ userName: 1 })
    .limit(10);

  if (accounts.length === 0) throw 'account not found';

  return accounts;
}

async function getTokenRefreshFromDb(token) {
  const tokenRefresh = await db.TokenRefresh.findOne({ token }).populate(
    'account'
  );

  if (!tokenRefresh) throw 'invalid token';
  if (!tokenRefresh.isActive) throw 'expired token';
  return tokenRefresh;
}

async function hash(password) {
  return bcrypt.hash(password, 10);
}

function generateTokenJwt(account) {
  // create a jwt token containing the account id that expires in 15 minutes
  return jwt.sign(
    { sub: account.id, id: account.id, userName: account.userName },
    SECRET,
    {
      expiresIn: '15m',
    }
  );
}

function generateTokenRefresh(account, ipAddress) {
  // create a refresh token that expires in 7 days
  return new db.TokenRefresh({
    account: account.id,
    token: getStringRandomForToken(),
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // after a week
    createdByIp: ipAddress,
  });
}

function getStringRandomForToken() {
  return crypto.randomBytes(40).toString('hex');
}

function getDetailsBasic(account) {
  const { id, userName, email, role, created, updated, isVerified, stats } =
    account;

  return {
    id,
    userName,
    email,
    role,
    created,
    updated,
    isVerified,
    stats,
  };
}

// details that are sent to a stranger
function getDetailsBasicForStranger(account) {
  const { id, userName, stats } = account;

  return {
    id,
    userName,
    stats,
  };
}

// details that are sent to search bar
function getDetailsBasicFromMany(accounts) {
  const accountsFiltered = accounts.map((acc) => ({
    id: acc.id,
    userName: acc.userName,
    stats: acc.stats,
  }));

  return accountsFiltered;
}

async function sendEmailVerification(account, origin) {
  let message;
  if (origin) {
    const verifyUrl = `${origin}/verify-email?token=${account.verificationToken}`;
    message = `<p>Please click the below link to verify your email address:</p>
                   <p><a href="${verifyUrl}">${verifyUrl}</a></p>`;
  } else {
    message = `<p>Please use the below token to verify your email address with the <code>/account/verify-email</code> api route:</p>
                   <p><code>${account.verificationToken}</code></p>`;
  }

  await sendEmail({
    to: account.email,
    subject: 'Sign-up Verification API - Verify Email',
    html: `<h4>Verify Email</h4>
               <p>Thanks for registering!</p>
               ${message}`,
  });
}

async function sendEmailAlreadyRegistered(email, origin) {
  let message;
  if (origin) {
    message = `<p>If you don't know your password please visit the <a href="${origin}/account/forgot-password">forgot password</a> page.</p>`;
  } else {
    message = `<p>If you don't know your password you can reset it via the <code>/account/forgot-password</code> api route.</p>`;
  }

  await sendEmail({
    to: email,
    subject: 'Sign-up Verification API - Email Already Registered',
    html: `<h4>Email Already Registered</h4>
               <p>Your email <strong>${email}</strong> is already registered.</p>
               ${message}`,
  });
}

async function sendEmailResetPassword(account, origin) {
  let message;
  if (origin) {
    const resetUrl = `${origin}/reset-password?token=${account.resetToken.token}`;
    message = `<p>Please click the below link to reset your password, the link will be valid for 1 day:</p>
                   <p><a href="${resetUrl}">${resetUrl}</a></p>`;
  } else {
    message = `<p>Please use the below token to reset your password with the <code>/account/reset-password</code> api route:</p>
                   <p><code>${account.resetToken.token}</code></p>`;
  }

  await sendEmail({
    to: account.email,
    subject: 'Sign-up Verification API - Reset Password',
    html: `<h4>Reset Password Email</h4>
               ${message}`,
  });
}
