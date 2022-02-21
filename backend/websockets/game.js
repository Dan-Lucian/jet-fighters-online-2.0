import { typesJet, delayInterval, imgW, imgH } from './config.js';
import { getRandomInt } from '../utils/getRandomInt.js';

const createStateGameInitial = (lobby) => ({
  owner: {
    name: lobby.owner.name,
    typeJet: lobby.owner.typeJet,
    x: 24,
    y: 24,
    angle: 0,
    scale: 1,
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
    y: 24,
    angle: 0,
    scale: 1,
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
    ...lobby.settings,
  },
  countFrame: 0,
});

let y = 0;

const startLoopGame = (wsOwner, wsJoiner, stateGame) => {
  console.log('stateGame:', stateGame);

  const idInterval = setInterval(() => {
    stateGame.owner.y = y;
    y += 1;

    const responseString = JSON.stringify({
      event: 'updateGame',
      stateGame,
    });

    wsOwner.send(responseString);
    wsJoiner.send(responseString);
  }, delayInterval);

  wsOwner.idInterval = idInterval;
  wsJoiner.idInterval = idInterval;
};

export { createStateGameInitial, startLoopGame };
