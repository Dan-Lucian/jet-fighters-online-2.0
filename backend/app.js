const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

// middleware
const handlerError = require('./middleware/handler-error');

// routes
const routerAccounts = require('./features/accounts/account.controller');

const app = express();

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(cookieParser());
app.use(
  morgan(
    ':remote-addr :remote-user :method :url :status :res[content-length] - :response-time ms'
  )
);

app.use('/accounts', routerAccounts);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(handlerError);

module.exports = app;
