import { WebSocketServer } from 'ws';
import queryString from 'query-string';

const websockets = (expressServer) => {
  const websocketServer = new WebSocketServer({
    noServer: true,
    path: '/websocket',
  });

  expressServer.on('upgrade', (request, socket, head) => {
    console.log('upgrading');
    websocketServer.handleUpgrade(request, socket, head, (websocket) => {
      websocketServer.emit('connection', websocket, request);
    });
  });

  websocketServer.on('connection', (websocketConnection, connectionRequest) => {
    const [_path, params] = connectionRequest?.url?.split('?') || [
      'error',
      null,
    ];
    const connectionParams = queryString.parse(params);

    console.log(connectionParams);

    // setInterval(() => {
    //   websocketConnection.send('lol');
    // }, 1000);

    websocketConnection.on('message', (message) => {
      const parsedMessage = JSON.parse(message);
      console.log(parsedMessage);
      // here you can respond
    });
  });

  return websocketServer;
};

export default websockets;
