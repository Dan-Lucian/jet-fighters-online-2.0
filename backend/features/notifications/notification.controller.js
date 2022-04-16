/* eslint-disable no-shadow */
const express = require('express');

const router = express.Router();
const Joi = require('joi');
const Role = require('../../utils/role');
const authorize = require('../../middleware/authorize');
const validateRequest = require('../../middleware/validate-request');
const notificationService = require('./notification.service');

// routes
router.get('/:id', authorize(Role.User), getByNotifierId);
router.post('/', authorize(Role.User), schemaCreate, create);

async function getByNotifierId(request, response, next) {
  const notifications = await notificationService.getByNotifierId(
    request.params.id
  );

  if (notifications.length > 0) {
    return response.json(notifications);
  }

  response.sendStatus(404);
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
    content: Joi.string().required(),
    // role: Joi.string().valid(Role.Admin, Role.User).required(),
  });
  validateRequest(request, next, schema);
}
