const { createId } = require('../../utils/createId');
const logger = require('../../utils/logger');

// how the lobby states are stored in the map
// const structureLobbyInMap = {
//   owner: {
//     name: namePlayer,
//     ws: objectWebsocket,
//     wins: 0,
//   },
//   joiner: {
//     name: namePlayer,
//     ws: objectWebsocket,
//     wins: 0,
//   },
//   settings: {},
// };

const allLobbies = new Map();

const createLobby = () => {
  let id;
  let lobby;

  do {
    id = `r${createId(6)}`;
    lobby = allLobbies.get(id);
  } while (lobby);

  allLobbies.set(id, {
    owner: null,
    joiner: null,
    settings: null,
  });

  return id;
};

const joinLobby = (id, player) => {
  const lobby = allLobbies.get(id);
  const { name, ws } = player;

  if (!lobby) return 'notFound';
  if (lobby.joiner) return 'full';

  if (lobby.owner) {
    if (lobby.owner.name === name) return 'same name';

    allLobbies.set(id, {
      owner: {
        ...lobby.owner,
      },
      joiner: {
        name,
        ws,
        wins: 0,
      },
      settings: null,
    });

    return 'success';
  }

  allLobbies.set(id, {
    owner: {
      name,
      ws,
      wins: 0,
    },
    joiner: null,
    settings: null,
  });

  return 'success';
};

const removeJoinerFromLobby = (id) => {
  const lobby = allLobbies.get(id);
  if (!lobby) {
    logger.info(`No lobby found when quiting, lobby ID: ${id}`);
    return 'notFound';
  }

  lobby.joiner = null;
  lobby.settings = null;
};

const destroyLobby = (id) => {
  allLobbies.delete(id);
};

const getLobby = (id) => {
  const lobby = allLobbies.get(id);

  return lobby;
};

module.exports = {
  allLobbies,
  createLobby,
  joinLobby,
  removeJoinerFromLobby,
  destroyLobby,
  getLobby,
};
