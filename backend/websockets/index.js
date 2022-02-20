import { WebSocketServer } from 'ws';
// import queryString from 'query-string';

import {
  createLobby,
  joinLobby,
  removeJoinerFromLobby,
  destroyLobby,
  getLobby,
} from './lobby.js';
import { createStateGameInitial } from './game.js';
import { areValidSettingsGame } from './validation.js';

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
        const { lobby: lobbyReceived } = messageJson;
        const lobby = getLobby(lobbyReceived.idLobby);
        if (!lobby) {
          console.log('no loby at EVENT: update');
          return;
        }

        const response = {
          event: 'updateLobby',
          lobby: lobbyReceived,
        };

        lobby.owner.ws.send(JSON.stringify(response));
        if (lobby.joiner) {
          lobby.joiner.ws.send(JSON.stringify(response));
        }
        return;
      }

      // a game start request
      // received when a player's lobby shows both players to be ready
      if (event === 'start') {
        const { idLobby, isOwnerLobby, settings } = messageJson;
        if (!areValidSettingsGame(settings)) {
          console.log('Received game settings are invalid');
          return;
        }

        const { typeJet, scoreMax, widthMap, heightMap } = settings;

        const lobby = getLobby(idLobby);
        if (!lobby) {
          console.error('No lobby found at EVENT: start');
          return;
        }
        const response = { event: 'requestReady' };
        lobby.settings = { scoreMax, widthMap, heightMap, idLobby };

        if (isOwnerLobby && lobby.joiner) {
          lobby.owner.typeJet = typeJet;
          lobby.joiner.ws.send(JSON.stringify(response));
          return;
        }

        if (isOwnerLobby) {
          console.error('No joiner');
          return;
        }

        lobby.joiner.typeJet = typeJet;
        lobby.owner.ws.send(JSON.stringify(response));
        return;
      }

      // requestReady's response
      // received are isReady for double checking and player's settings
      if (event === 'responseReady') {
        const { idLobby, isReady, isOwnerLobby, settings } = messageJson;
        const { typeJet } = settings;
        const lobby = getLobby(idLobby);
        if (!lobby) {
          console.error('No lobby found at EVENT: responseReady');
          return;
        }
        const response = { event: 'start' };

        if (isOwnerLobby && isReady) {
          lobby.owner.typeJet = typeJet;
          response.stateGame = createStateGameInitial(lobby);
          lobby.owner.ws.send(JSON.stringify(response));
          lobby.joiner.ws.send(JSON.stringify(response));
          return;
        }

        if (!isReady) {
          console.error('Other player not ready');
          return;
        }

        lobby.joiner.typeJet = typeJet;
        response.stateGame = createStateGameInitial(lobby);
        lobby.owner.ws.send(JSON.stringify(response));
        lobby.joiner.ws.send(JSON.stringify(response));
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
