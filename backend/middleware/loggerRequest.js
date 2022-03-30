const morgan = require('morgan');

const skipLog = (req, res) => {
  const { url } = req;

  if (
    url.match(/(js|jpg|png|ico|css|woff|woff2|eot|webp|svg|refresh-token)$/gi)
  ) {
    return true;
  }

  return false;
};

morgan.token(
  'ip',
  (req) => req.headers['x-forwarded-for'] || req.connection.remoteAddress
);

const loggerRequest = morgan(
  ':ip :method :url :status :res[content-length] - :response-time ms',
  { skip: skipLog }
);

module.exports = loggerRequest;
