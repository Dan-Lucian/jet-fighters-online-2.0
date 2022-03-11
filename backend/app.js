const express = require('express');
require('express-async-errors');
const cors = require('cors');
const path = require('path');

const loggerRequest = require('./middleware/logger-request');
const handlerError = require('./middleware/handler-error');

const app = express();

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(loggerRequest);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(handlerError);

module.exports = app;
