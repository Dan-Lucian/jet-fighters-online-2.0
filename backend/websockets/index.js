import { WebSocketServer } from 'ws';
// import queryString from 'query-string';

// lobby
import {
  createLobby,
  joinLobby,
  removeJoinerFromLobby,
  destroyLobby,
  getLobby,
} from './lobby.js';

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
      console.log('Received:', messageJson);
      const { event } = messageJson;

      // create request
      if (event === 'create') {
        const { name } = messageJson;

        // returns created lobby's ID
        const idLobby = createLobby();

        joinLobby(idLobby, {
          name,
          ws: websocketConnection,
        });

        const response = {
          event: 'create',
          success: true,
          idLobby,
          name,
        };

        websocketConnection.idLobby = idLobby;
        websocketConnection.send(JSON.stringify(response));
        return;
      }

      // join request
      if (event === 'join') {
        const { idLobby, name } = messageJson;

        // returns join attempt's result
        const statusJoin = joinLobby(idLobby, {
          name,
          ws: websocketConnection,
        });

        const response = {
          event: 'joinResponse',
          success: false,
          idLobby,
          reason: statusJoin,
        };

        if (statusJoin === 'success') {
          const lobby = getLobby(idLobby);
          response.success = true;
          response.nameOwner = lobby.owner.name;
          response.nameJoiner = lobby.joiner.name;

          const responseToOwner = { ...response, event: 'join' };

          // send message to owner that somebody joined the lobby
          lobby.owner.ws.send(JSON.stringify(responseToOwner));
          websocketConnection.idLobby = idLobby;
        }

        websocketConnection.send(JSON.stringify(response));
        return;
      }

      // updateLobby request
      if (event === 'updateLobby') {
        const { game } = messageJson;
        const lobby = getLobby(game.idLobby);

        const response = {
          event: 'updateLobby',
          game,
        };

        lobby.owner.ws.send(JSON.stringify(response));
        if (lobby.joiner) {
          lobby.joiner.ws.send(JSON.stringify(response));
        }
        return;
      }

      // quitLobby event
      if (event === 'quitLobby') {
        const { idLobby, isOwnerLobby } = messageJson;
        const lobby = getLobby(idLobby);
        const response = {
          event: isOwnerLobby ? 'destroyLobby' : 'quitLobby',
        };

        if (isOwnerLobby) {
          // if lobby has a joiner then send msg to him as well
          if (lobby.joiner) {
            lobby.joiner.ws.send(JSON.stringify(response));
            lobby.joiner.idLobby = null;
          }

          websocketConnection.idLobby = null;
          destroyLobby(idLobby);
          return;
        }

        websocketConnection.idLobby = null;
        removeJoinerFromLobby(idLobby);
        lobby.owner.ws.send(JSON.stringify(response));
      }
    });

    websocketConnection.on('close', () => {
      const { idLobby } = websocketConnection;
      if (!idLobby) return;

      const lobby = getLobby(idLobby);
      if (!lobby) return;
      const isOwnerLobby = websocketConnection === lobby.owner.ws;

      const response = {
        event: isOwnerLobby ? 'destroyLobby' : 'quitLobby',
      };

      if (isOwnerLobby) {
        // if lobby has a joiner then send msg to him as well
        if (lobby.joiner) {
          lobby.joiner.ws.send(JSON.stringify(response));
          lobby.joiner.idLobby = null;
        }
        destroyLobby(idLobby);
        return;
      }

      websocketConnection.idLobby = null;
      removeJoinerFromLobby(idLobby);
      lobby.owner.ws.send(JSON.stringify(response));
    });
  });

  return websocketServer;
};

export default websockets;
