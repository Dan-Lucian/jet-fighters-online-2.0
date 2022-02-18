import { createId } from '../utils/createId.js';

// how the lobby states are stored in the map
// const structureLobbyInMap = {
//   owner: {
//     name: namePlayer,
//     ws: objectWebsocket,
//   },
//   joiner: {
//     name: namePlayer,
//     ws: objectWebsocket,
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
    allLobbies.set(id, {
      owner: {
        ...lobby.owner,
      },
      joiner: {
        name,
        ws,
      },
      settings: null,
    });

    return 'success';
  }

  allLobbies.set(id, {
    owner: {
      name,
      ws,
    },
    joiner: null,
    settings: null,
  });

  return 'success';
};

const removeJoinerFromLobby = (id) => {
  const lobby = allLobbies.get(id);
  if (!lobby) {
    console.log(`No lobby found when quiting, lobby ID: ${id}`);
    return;
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

export {
  createLobby,
  joinLobby,
  removeJoinerFromLobby,
  destroyLobby,
  getLobby,
};
