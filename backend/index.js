import http from 'http';
import app from './app.js';
import { PORT } from './utils/config.js';
import websockets from './websockets/index.js';

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// put on all the websocket related stuff on the server
websockets(server);
