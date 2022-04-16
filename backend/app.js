const express = require('express');
require('express-async-errors');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const loggerRequest = require('./middleware/loggerRequest');

// middleware
const handlerError = require('./middleware/handler-error');

// routes
const routerAccounts = require('./features/accounts/account.controller');
const routerNotifications = require('./features/notifications/notification.controller');

const app = express();

app.use(cors());
app.use(loggerRequest);
app.use(express.static('build'));
app.use(express.json());
app.use(cookieParser());

app.use('/accounts', routerAccounts); // change to /api/accounts
app.use('/api/notifications', routerNotifications);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(handlerError);

module.exports = app;
