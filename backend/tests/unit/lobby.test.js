const lobby = require('../../features/game/lobby');

const idLobby = 'test';

const owner = {
  name: 'owner',
  ws: null,
  wins: 0,
};

const joiner = {
  name: 'joiner',
  ws: null,
  wins: 0,
};

const anon = {
  name: 'Anon',
  ws: null,
  wins: 0,
};

beforeEach(() => {
  lobby.getAll.clear();
});

describe('Creating a lobby', () => {
  test('succeeds and creates an object', () => {
    lobby.create();

    expect(lobby.getAll.size).toBe(1);
  });
});

describe('Joining a lobby', () => {
  test('succeeds with "success" if lobby empty', () => {
    lobby.getAll.set(idLobby, { owner: null, joiner: null });

    const result = lobby.join(idLobby, owner);

    expect(result).toBe('success');
    expect(lobby.getAll.get(idLobby).owner).toEqual(owner);
  });

  test('succeeds with "success" if lobby half-empty', () => {
    lobby.getAll.set(idLobby, { owner, joiner: null });

    const result = lobby.join(idLobby, joiner);

    expect(result).toBe('success');
    expect(lobby.getAll.get(idLobby).owner).toEqual(owner);
    expect(lobby.getAll.get(idLobby).joiner).toEqual(joiner);
  });

  test('succeeds with "success" if 2 names are "Anon"', () => {
    lobby.getAll.set(idLobby, { owner: anon, joiner: null });

    const result = lobby.join(idLobby, anon);

    expect(result).toBe('success');
    expect(lobby.getAll.get(idLobby).owner).toEqual(anon);
    expect(lobby.getAll.get(idLobby).joiner).toEqual(anon);
  });

  test('fails with "full" if room full', () => {
    lobby.getAll.set(idLobby, { owner, joiner });

    const player = { name: 'player', ws: null, wins: 0 };

    const result = lobby.join(idLobby, player);

    expect(result).toBe('full');
    expect(lobby.getAll.get(idLobby).owner).toEqual(owner);
    expect(lobby.getAll.get(idLobby).joiner).toEqual(joiner);
  });

  test('fails with "notFound" if room not found', () => {
    const player = { name: 'player', ws: null, wins: 0 };

    const result = lobby.join(idLobby, player);

    expect(result).toBe('notFound');
    expect(lobby.getAll.size).toBe(0);
  });

  test('should fail with "same name" name already in lobby', () => {
    lobby.getAll.set(idLobby, { owner, joiner: null });

    const result = lobby.join(idLobby, owner);

    expect(result).toBe('same name');
    expect(lobby.getAll.get(idLobby).owner).toEqual(owner);
    expect(lobby.getAll.get(idLobby).joiner).toBeNull();
  });
});

describe('Removing the joiner from the room', () => {
  test('succeeds leaving only the owner inside', () => {
    lobby.getAll.set(idLobby, { owner, joiner });

    lobby.removeJoiner(idLobby);

    expect(lobby.getAll.get(idLobby).owner).toEqual(owner);
    expect(lobby.getAll.get(idLobby).joiner).toBeNull();
  });

  test('fails width "notFound" if lobby not found', () => {
    const idNonExistent = 'nonExistent';
    lobby.getAll.set(idLobby, { owner, joiner });

    const result = lobby.removeJoiner(idNonExistent);
    expect(lobby.getAll.size).toBe(1);
    expect(result).toBe('notFound');
  });
});

describe('Removing the joiner from the room', () => {
  test.only('removeStateGame(id) should remove state game', () => {
    lobby.getAll.set(idLobby, { owner, joiner, stateGame: true });

    expect(lobby.getAll.get(idLobby).stateGame).toBe(true);

    lobby.removeStateGame(idLobby);

    expect(lobby.getAll.get(idLobby).stateGame).toBeNull();
  });
});
