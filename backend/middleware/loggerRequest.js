const morgan = require('morgan');

morgan.token(
  'ip',
  (req) => req.headers['x-forwarded-for'] || req.connection.remoteAddress
);

const loggerRequest = morgan(
  ':ip :method :url :status :res[content-length] - :response-time ms'
);

module.exports = loggerRequest;
