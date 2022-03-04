const express = require('express');
require('express-async-errors');
const mongoose = require('mongoose');
const cors = require('cors');

const logger = require('./utils/logger');
const { MONGODB_URI } = require('./utils/config');
const middleware = require('./utils/middleware');
const routerWild = require('./controllers/wild');
const routerUsers = require('./controllers/users');
const routerLogin = require('./controllers/login');

const app = express();

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.loggerRequest);

app.use('/api/login', routerLogin);
app.use('/api/users', routerUsers);
app.use('*', routerWild);

app.use(middleware.endpointUknown);
app.use(middleware.handlerError);

module.exports = app;
