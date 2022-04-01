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

morgan.token('time', () => {
  const time = new Date();

  // server - Romania time diff
  time.setHours(time.getHours() + 3);

  return time.toLocaleString('ro-RO');
});

morgan.token('ip', (req) => {
  // const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const ip = req.headers['x-real-ip'];

  return ip;
});

const loggerRequest = morgan(
  '[:time] [:ip] [:status - :response-time ms] [:method :url]',
  { skip: skipLog }
);

module.exports = loggerRequest;
