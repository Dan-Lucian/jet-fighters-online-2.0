import {
  allLobbies,
  createLobby,
  joinLobby,
  removeJoinerFromLobby,
} from '../websockets/lobby.js';

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

beforeEach(() => {
  allLobbies.clear();
});

describe('Creating a lobby', () => {
  test('succeeds and creates an object', () => {
    createLobby();

    expect(allLobbies.size).toBe(1);
  });
});

describe('Joining a lobby', () => {
  test('succeeds with "success" if lobby empty', () => {
    allLobbies.set(idLobby, { owner: null, joiner: null });

    const result = joinLobby(idLobby, owner);

    expect(result).toBe('success');
    expect(allLobbies.get(idLobby).owner).toEqual(owner);
  });

  test('succeeds with "success" if lobby half-empty', () => {
    allLobbies.set(idLobby, { owner, joiner: null });

    const result = joinLobby(idLobby, joiner);

    expect(result).toBe('success');
    expect(allLobbies.get(idLobby).owner).toEqual(owner);
    expect(allLobbies.get(idLobby).joiner).toEqual(joiner);
  });

  test('fails with "full" if room full', () => {
    allLobbies.set(idLobby, { owner, joiner });

    const player = { name: 'player', ws: null, wins: 0 };

    const result = joinLobby(idLobby, player);

    expect(result).toBe('full');
    expect(allLobbies.get(idLobby).owner).toEqual(owner);
    expect(allLobbies.get(idLobby).joiner).toEqual(joiner);
  });

  test('fails with "notFound" if room not found', () => {
    const player = { name: 'player', ws: null, wins: 0 };

    const result = joinLobby(idLobby, player);

    expect(result).toBe('notFound');
    expect(allLobbies.size).toBe(0);
  });
});

describe('Removing the joiner from the room', () => {
  test('succeeds leaving only the owner inside', () => {
    allLobbies.set(idLobby, { owner, joiner });

    removeJoinerFromLobby(idLobby);

    expect(allLobbies.get(idLobby).owner).toEqual(owner);
    expect(allLobbies.get(idLobby).joiner).toBeNull();
  });

  test('fails width "notFound" if lobby not found', () => {
    const idNonExistent = 'nonExistent';
    allLobbies.set(idLobby, { owner, joiner });

    const result = removeJoinerFromLobby(idNonExistent);
    expect(allLobbies.size).toBe(1);
    expect(result).toBe('notFound');
  });
});
