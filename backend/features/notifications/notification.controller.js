/* eslint-disable no-shadow */
const express = require('express');

const router = express.Router();
const Joi = require('joi');
const Role = require('../../utils/role');
const authorize = require('../../middleware/authorize');
const validateRequest = require('../../middleware/validate-request');
const notificationService = require('./notification.service');

// routes
router.get(
  '/:userName',
  authorize([Role.User, Role.Admin]),
  getByNotifierUserName
);
router.post('/:userName', authorize(Role.User), schemaCreate, create);
router.post('/:userName/read', authorize(Role.User), markManyAsRead);
router.post('/:userName/read/:id', authorize(Role.User), markAsRead);

async function getByNotifierUserName(request, response, next) {
  if (request.params.userName !== request.user.userName) {
    throw 'unauthorized';
  }

  const notifications = await notificationService.getByNotifierUserName(
    request.params.userName
  );

  return response.json(notifications);
}

async function create(request, response, next) {
  const notification = await notificationService.create(request.body);
  response.status(201).json(notification);
}

module.exports = router;

function schemaCreate(request, response, next) {
  const schema = Joi.object({
    actor: Joi.string().required(),
    notifier: Joi.string().required(),
    type: Joi.string().required(),
    content: Joi.string(),
  });
  validateRequest(request, next, schema);
}

async function markAsRead(request, response, next) {
  // userName passed for the ownership check
  const notification = await notificationService.markAsRead(
    request.params.id,
    request.user.userName
  );

  return response.json(notification);
}

async function markManyAsRead(request, response, next) {
  // userName passed for the ownership check
  const notification = await notificationService.markManyAsRead(
    request.body,
    request.user.userName
  );

  return response.json(notification);
}
