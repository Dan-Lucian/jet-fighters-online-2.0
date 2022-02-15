import { createId } from '../utils/createId.js';

const allLobbies = new Map();

const createLobby = () => {
  let id;
  let lobby;

  do {
    id = `r${createId(6)}`;
    lobby = allLobbies.get(id);
    console.log(Boolean(lobby));
  } while (lobby);

  allLobbies.set(id, {
    ws1: null,
    ws2: null,
    settingsGame: null,
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
    });

    return 'success';
  }

  allLobbies.set(id, {
    owner: {
      name,
      ws,
    },
    joiner: null,
  });

  return 'success';
};

const getLobby = (id) => {
  const lobby = allLobbies.get(id);

  return lobby;
};

export { createLobby, joinLobby, getLobby };
