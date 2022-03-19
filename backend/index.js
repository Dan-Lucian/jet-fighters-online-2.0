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
