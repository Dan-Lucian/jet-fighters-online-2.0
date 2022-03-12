/* eslint-disable no-shadow */
const express = require('express');

const router = express.Router();
const Joi = require('joi');
const Role = require('../../utils/role');
const authorize = require('../../middleware/authorize');
const validateRequest = require('../../middleware/validate-request');
const accountService = require('./account.service');

// routes
router.post('/register', schemaRegister, register);
router.post('/verify-email', schemaVerifyEmail, verifyEmail);
router.post('/authenticate', schemaAuthenticate, authenticate);
router.post('/refresh-token', refreshToken);
router.post('/revoke-token', authorize(), schemaRevokeToken, revokeToken);
router.post('/forgot-password', schemaForgotPassword, forgotPassword);
router.post(
  '/validate-reset-token',
  schemaValidateResetToken,
  validateResetToken
);
router.post('/reset-password', schemaResetPassword, resetPassword);
router.get('/', authorize(Role.Admin), getAll);
router.get('/:id', authorize(), getById);
router.post('/', authorize(Role.Admin), schemaCreate, create);
router.put('/:id', authorize(), schemaUpdate, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function schemaRegister(request, response, next) {
  const schema = Joi.object({
    userName: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    passwordConfirm: Joi.string().valid(Joi.ref('password')).required(),
  });
  validateRequest(request, next, schema);
}

async function register(request, response, next) {
  await accountService.register(request.body, request.get('origin'));

  response.status(201).json({
    message:
      'Registration successful, please check your email for verification instructions',
  });
}

function schemaVerifyEmail(request, response, next) {
  const schema = Joi.object({
    token: Joi.string().required(),
  });
  validateRequest(request, next, schema);
}

async function verifyEmail(request, response, next) {
  await accountService.verifyEmail(request.body);

  response.json({ message: 'Verification successful, you can now login' });
}

function schemaAuthenticate(request, response, next) {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  validateRequest(request, next, schema);
}

async function authenticate(request, response, next) {
  const { email, password } = request.body;
  const ipAddress = request.ip;

  const { tokenRefresh, ...account } = await accountService.authenticate({
    email,
    password,
    ipAddress,
  });

  putTokenInCookie(response, tokenRefresh);
  response.json(account);
}

async function refreshToken(request, response, next) {
  const tokenRefreshReceived = request.cookies.tokenRefresh;
  const ipAddress = request.ip;

  const { tokenRefresh, ...account } = await accountService.refreshToken({
    tokenRefreshReceived,
    ipAddress,
  });

  putTokenInCookie(response, tokenRefresh);
  response.json(account);
}

function schemaRevokeToken(request, response, next) {
  const schema = Joi.object({
    tokenRefresh: Joi.string(),
  });
  validateRequest(request, next, schema);
}

async function revokeToken(request, response, next) {
  // if no refresh token in the httpOnly cookie then exit
  if (!request.cookies.tokenRefresh)
    throw 'missing refresh token from the httpOnly cookie';

  const tokenRefresh =
    request.body.tokenRefresh || request.cookies.tokenRefresh;
  const ipAddress = request.ip;

  // users can revoke their own tokens and admins can revoke any tokens
  if (
    !request.user.ownsToken(tokenRefresh) &&
    request.user.role !== Role.Admin
  ) {
    throw 'unauthorized';
  }

  await accountService.revokeToken({ tokenRefresh, ipAddress });
  response.json({ message: 'Token revoked' });
}

function schemaForgotPassword(request, response, next) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });
  validateRequest(request, next, schema);
}

async function forgotPassword(request, response, next) {
  await accountService.forgotPassword(request.body, request.get('origin'));
  response.json({
    message: 'Please check your email for password reset instructions',
  });
}

function schemaValidateResetToken(request, response, next) {
  const schema = Joi.object({
    token: Joi.string().required(),
  });
  validateRequest(request, next, schema);
}

async function validateResetToken(request, response, next) {
  await accountService.validateResetToken(request.body);
  response.json({ message: 'Token is valid' });
}

function schemaResetPassword(request, response, next) {
  const schema = Joi.object({
    token: Joi.string().required(),
    password: Joi.string().min(8).required(),
    passwordConfirm: Joi.string().valid(Joi.ref('password')).required(),
  });
  validateRequest(request, next, schema);
}

async function resetPassword(request, response, next) {
  await accountService.resetPassword(request.body);
  response.json({ message: 'Password reset successful, you can now login' });
}

async function getAll(request, response, next) {
  const accounts = await accountService.getAll();
  response.json(accounts);
}

async function getById(request, response, next) {
  // users can get their own account and admins can get any account
  if (
    request.params.id !== request.user.id &&
    request.user.role !== Role.Admin
  ) {
    throw 'unauthorized';
  }

  const account = await accountService.getById(request.params.id);
  if (account) {
    return response.json(account);
  }
  response.sendStatus(404);
}

function schemaCreate(request, response, next) {
  const schema = Joi.object({
    userName: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    passwordConfirm: Joi.string().valid(Joi.ref('password')).required(),
    role: Joi.string().valid(Role.Admin, Role.User).required(),
  });
  validateRequest(request, next, schema);
}

async function create(request, response, next) {
  const account = await accountService.create(request.body);
  response.status(201).json(account);
}

function schemaUpdate(request, response, next) {
  const schemaRules = {
    userName: Joi.string().empty(''),
    email: Joi.string().email().empty(''),
    password: Joi.string().min(8).empty(''),
    passwordConfirm: Joi.string().valid(Joi.ref('password')).empty(''),
  };

  // only admins can update role
  if (request.user.role === Role.Admin) {
    schemaRules.role = Joi.string().valid(Role.Admin, Role.User).empty('');
  }

  const schema = Joi.object(schemaRules).with('password', 'passwordConfirm');
  validateRequest(request, next, schema);
}

async function update(request, response, next) {
  // users can update their own account and admins can update any account
  if (
    request.params.id !== request.user.id &&
    request.user.role !== Role.Admin
  ) {
    throw 'unauthorized';
  }

  const account = await accountService.update(request.params.id, request.body);
  response.json(account);
}

async function _delete(request, response, next) {
  // users can delete their own account and admins can delete any account
  if (
    request.params.id !== request.user.id &&
    request.user.role !== Role.Admin
  ) {
    throw 'unauthorized';
  }

  await accountService.delete(request.params.id);
  response.json({ message: 'account deleted successfully' });
}

// helper functions

function putTokenInCookie(response, token) {
  // create cookie with refresh token that expires in 7 days
  const cookieOptions = {
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  };
  response.cookie('tokenRefresh', token, cookieOptions);
}
