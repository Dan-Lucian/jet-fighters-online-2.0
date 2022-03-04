const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const routerUsers = express.Router();

routerUsers.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs');

  response.json(users);
});

routerUsers.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  if (!password || password.length < 6) {
    return response.status(400).json({
      error: 'password too short, it has to be at least 6 characters',
    });
  }

  const userFound = await User.findOne({ username });
  if (userFound) {
    return response.status(400).json({ error: 'username must be unique' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({ username, name, passwordHash });
  const userSaved = await user.save();

  response.status(201).json(userSaved);
});

module.exports = routerUsers;
