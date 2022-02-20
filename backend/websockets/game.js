import { typesJet } from './config.js';

const createStateGameInitial = (lobby) => ({
  owner: {
    name: lobby.owner.name,
    typeJet: lobby.owner.typeJet,
    x: 0,
    y: 0,
    angle: 0,
    scale: 2,
    leftArrowPressed: false,
    rightArrowPressed: false,
    spacePressed: false,
    bullets: [],
    score: 0,
    playerNumber: 'p1',
    speed: 0,
    ...typesJet[lobby.owner.typeJet],
  },
  joiner: {
    name: lobby.joiner.name,
    typeJet: lobby.joiner.typeJet,
    x: 100,
    y: 100,
    angle: 0,
    scale: 2,
    leftArrowPressed: false,
    rightArrowPressed: false,
    spacePressed: false,
    bullets: [],
    score: 0,
    playerNumber: 'p2',
    speed: 0,
    ...typesJet[lobby.joiner.typeJet],
  },
  settings: {
    winPlayer: null,
    idLobby: lobby.settings.idLobby,
    scoreMax: lobby.settings.scoreMax,
    widthMap: lobby.settings.widthMap,
    heightMap: lobby.settings.heightMap,
  },
});

const startLoopGame = (wsOwner, wsJoiner, stateGame) => {
  console.log('stateGame:', stateGame);
  setInterval(() => {
    const responseString = JSON.stringify({ event: 'updateGame', stateGame });
    wsOwner.send(responseString);
    wsJoiner.send(responseString);
  }, 1000);
};

export { createStateGameInitial, startLoopGame };
