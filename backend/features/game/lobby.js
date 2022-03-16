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

const getAll = new Map();

module.exports = {
  getAll,
  create,
  join,
  removeJoiner,
  destroy,
  getById,
  removeStateGame,
};

function create() {
  let id;
  let lobby;

  do {
    id = `r${createId(6)}`;
    lobby = getAll.get(id);
  } while (lobby);

  getAll.set(id, {
    owner: null,
    joiner: null,
    settings: null,
  });

  return id;
}

function join(id, player) {
  const lobby = getAll.get(id);
  const { name, ws } = player;

  if (!lobby) return 'notFound';
  if (lobby.joiner) return 'full';

  if (lobby.owner) {
    if (lobby.owner.name === name && lobby.owner.name !== 'Anon')
      return 'same name';

    getAll.set(id, {
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

  getAll.set(id, {
    owner: {
      name,
      ws,
      wins: 0,
    },
    joiner: null,
    settings: null,
  });

  return 'success';
}

function removeJoiner(id) {
  const lobby = getAll.get(id);
  if (!lobby) {
    logger.info(`No lobby found when quiting, lobby ID: ${id}`);
    return 'notFound';
  }

  lobby.joiner = null;
  lobby.settings = null;
}

function destroy(id) {
  getAll.delete(id);
}

function getById(id) {
  const lobby = getAll.get(id);

  return lobby;
}

function removeStateGame(id) {
  const lobby = getById(id);
  lobby.stateGame = null;
}
