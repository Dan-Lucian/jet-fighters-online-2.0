const http = require('http');
const app = require('./app');
const { PORT } = require('./config/env');
const websocket = require('./features/game/websocket');
const logger = require('./utils/logger');

const server = http.createServer(app);

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

// put on all the websocket related stuff on the server
websocket(server);

const hrtimeMs = function () {
  const time = process.hrtime();
  return time[0] * 1000 + time[1] / 1000000;
};

const TICK_RATE = 20;
let tick = 0;
let previous = hrtimeMs();
const tickLengthMs = 1000 / TICK_RATE;

const loop = () => {
  setTimeout(loop, tickLengthMs);
  const now = hrtimeMs();
  const delta = (now - previous) / 1000;
  console.log('delta', delta);
  // game.update(delta, tick) // game logic would go here
  previous = now;
  tick += 1;
};

loop(); // starts the loop
