import { WebSocketServer } from 'ws';
// import queryString from 'query-string';

// lobby
import { createLobby, joinLobby, getLobby } from './lobby.js';

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
    // const [_path, params] = connectionRequest?.url?.split('?') || [
    //   'error',
    //   null,
    // ];
    // const connectionParams = queryString.parse(params);
    // console.log('params: ', connectionParams);

    websocketConnection.on('message', (message) => {
      const messageJson = JSON.parse(message);
      console.log(messageJson);
      const { event } = messageJson;

      // create request
      if (event === 'create') {
        const { namePlayerCurrent } = messageJson;

        // returns created lobby's ID
        const idLobby = createLobby();

        joinLobby(idLobby, {
          name: namePlayerCurrent,
          ws: websocketConnection,
        });

        const response = {
          event: 'create',
          success: true,
          idLobby,
        };

        websocketConnection.send(JSON.stringify(response));
        // console.log('lobby: ', getLobby(idLobby));
      }

      // join request
      if (event === 'join') {
        const { idLobby, namePlayerCurrent } = messageJson;

        // returns join attempt's result
        const statusJoin = joinLobby(idLobby, {
          name: namePlayerCurrent,
          ws: websocketConnection,
        });

        const response = {
          event: 'join',
          success: false,
          idLobby,
        };

        if (statusJoin === 'notFound' || statusJoin === 'full') {
          response.reason = statusJoin;
        }

        if (statusJoin === 'success') {
          const lobby = getLobby(idLobby);
          response.success = true;
          response.nameOwner = lobby.owner.name;
          response.nameJoiner = lobby.joiner.name;

          // send message to owner that somebody joined the lobby
          lobby.owner.ws.send(JSON.stringify(response));
        }

        websocketConnection.send(JSON.stringify(response));
        // console.log('lobby: ', getLobby(idLobby));
      }

      // updateLobby request
      // if (event === 'updateLobby') {
      //   const { game } = messageJson;
      //   const response = {
      //     event: 'updateLobby',
      //     game,
      //   };

      //   websocketConnection.send(JSON.stringify(response));
      // }
    });
  });

  return websocketServer;
};

export default websockets;
