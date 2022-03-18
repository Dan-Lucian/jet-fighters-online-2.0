/* eslint-disable no-shadow */
const { WebSocketServer } = require('ws');
const helperLobby = require('./lobby');
const {
  createStateGameInitial,
  startLoopGame,
  injectInputIntoGame,
} = require('./game');
const { areValidSettingsGame } = require('./validation');
const logger = require('../../utils/logger');
const gameService = require('./game.service');

const websocket = (expressServer) => {
  const websocketServer = new WebSocketServer({
    noServer: true,
    path: '/websocket',
  });

  startPingPong(websocketServer);

  expressServer.on('upgrade', (request, socket, head) => {
    logger.info('upgrading to websocket');
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
    // logger.info('params: ', connectionParams);

    websocketConnection.isAlive = true;
    websocketConnection.on('pong', heartbeat);

    websocketConnection.on('message', (message) => {
      const messageJson = JSON.parse(message);
      // logger.info('Received:', messageJson);
      const { event } = messageJson;

      if (event === 'input') {
        const { idLobby } = websocketConnection;
        const lobby = helperLobby.getById(idLobby);
        if (!lobby) return;
        if (!lobby.stateGame) return;

        injectInputIntoGame(messageJson, lobby.stateGame);
      }

      // create request
      if (event === 'create') {
        const { name } = messageJson;

        // returns created lobby's ID
        const idLobby = helperLobby.create();

        helperLobby.join(idLobby, {
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
        const statusJoin = helperLobby.join(idLobby, {
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
          const lobby = helperLobby.getById(idLobby);
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
        const lobby = helperLobby.getById(lobbyReceived.idLobby);
        if (!lobby) {
          logger.info('no loby at EVENT: update');
          return;
        }

        const response = {
          event: 'updateLobby',
          lobby: lobbyReceived,
        };

        const responseString = JSON.stringify(response);
        lobby.owner.ws.send(responseString);
        if (lobby.joiner) {
          lobby.joiner.ws.send(responseString);
        }
        return;
      }

      // a game start request
      // received when a player's lobby shows both players to be ready
      if (event === 'start') {
        const { idLobby, isOwnerLobby, settings } = messageJson;
        if (!areValidSettingsGame(settings)) {
          logger.info('Received game settings are invalid');
          return;
        }

        const { typeJet, scoreMax, widthMap, heightMap } = settings;

        const lobby = helperLobby.getById(idLobby);
        if (!lobby) {
          logger.error('No lobby found at EVENT: start');
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
          logger.error('No joiner');
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
        const lobby = helperLobby.getById(idLobby);
        if (!lobby) {
          logger.error('No lobby found at EVENT: responseReady');
          return;
        }
        const response = { event: 'start' };

        if (isOwnerLobby && isReady) {
          lobby.owner.typeJet = typeJet;
          lobby.stateGame = createStateGameInitial(lobby);
          response.stateGame = lobby.stateGame;

          const responseString = JSON.stringify(response);
          lobby.owner.ws.send(responseString);
          lobby.joiner.ws.send(responseString);
          return;
        }

        if (!isReady) {
          logger.error('Other player not ready');
          return;
        }

        lobby.joiner.typeJet = typeJet;
        lobby.stateGame = createStateGameInitial(lobby);
        response.stateGame = lobby.stateGame;

        const responseString = JSON.stringify(response);
        lobby.owner.ws.send(responseString);
        lobby.joiner.ws.send(responseString);
        return;
      }

      if (event === 'countdownEnd') {
        const { idLobby } = messageJson;
        const lobby = helperLobby.getById(idLobby);

        // startLoopGame(lobby.owner.ws, lobby.joiner.ws, lobby.stateGame);
        startLoopGame(lobby);
      }

      // quitLobby event
      if (event === 'quitLobby') {
        const { idLobby, isOwnerLobby } = messageJson;
        const lobby = helperLobby.getById(idLobby);
        const response = {
          event: isOwnerLobby ? 'quitOwner' : 'quitJoiner',
        };

        if (isOwnerLobby) {
          // if lobby has a joiner then send msg to him as well
          if (lobby.joiner) {
            lobby.joiner.ws.send(JSON.stringify(response));
            lobby.joiner.idLobby = null;
          }

          websocketConnection.idLobby = null;
          helperLobby.destroy(idLobby);
          return;
        }

        websocketConnection.idLobby = null;

        const result = helperLobby.removeJoiner(idLobby);
        if (result === 'notFound') return;
        lobby.owner.ws.send(JSON.stringify(response));
      }
    });

    websocketConnection.on('close', () => {
      const { idLobby } = websocketConnection;
      const lobby = helperLobby.getById(idLobby);
      if (!lobby) return;

      const isOwnerLobby = websocketConnection === lobby.owner.ws;

      const winner = isOwnerLobby ? 'quitOwner' : 'quitJoiner';
      const response = {
        event: winner,
      };

      // if disconnect during game
      if (lobby.stateGame) {
        // "winner" used by gameService.updateStats() below
        lobby.stateGame.settings.winner = winner;
        gameService
          .updateStats(lobby.stateGame)
          .catch((error) => logger.error('Error caught: ', error));
        helperLobby.removeStateGame(idLobby);
      }

      if (isOwnerLobby) {
        // if lobby has a joiner then send msg to him
        if (lobby.joiner) {
          lobby.joiner.ws.send(JSON.stringify(response));
          lobby.joiner.ws.idLobby = null;
          clearInterval(lobby.joiner.ws.idInterval);
          lobby.joiner.ws.idInterval = null;
        }
        helperLobby.destroy(idLobby);
        return;
      }

      const result = helperLobby.removeJoiner(idLobby);
      if (result === 'notFound') return;

      clearInterval(lobby.owner.ws.idInterval);
      lobby.owner.ws.send(JSON.stringify(response));
      lobby.owner.ws.idInterval = null;
    });
  });

  return websocketServer;
};

// used for ping-pong connection check
function heartbeat() {
  this.isAlive = true;
}

const startPingPong = (serverWs) => {
  setInterval(() => {
    serverWs.clients.forEach((ws) => {
      if (ws.isAlive === false) {
        logger.info('ws connection closed, reason: idle.');
        ws.terminate();
        return;
      }

      ws.isAlive = false;
      ws.ping();
    });
  }, 25000);
};

module.exports = websocket;
