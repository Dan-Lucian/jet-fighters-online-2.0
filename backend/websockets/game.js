import { typesJet, delayInterval, imgW, imgH } from './config.js';
import { getRandomInt } from '../utils/getRandomInt.js';

const allStatesGame = new Map();

const createStateGameInitial = (lobby) => {
  const { widthMap, heightMap } = lobby.settings;

  return {
    owner: {
      name: lobby.owner.name,
      typeJet: lobby.owner.typeJet,
      x: getRandomInt(imgW, widthMap - imgW),
      y: getRandomInt(imgH, heightMap - imgH),
      angle: getRandomInt(0, 360),
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
      x: getRandomInt(imgW, widthMap - imgW),
      y: getRandomInt(imgH, heightMap - imgH),
      angle: getRandomInt(0, 360),
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
  };
};

let y = 0;

const startLoopGame = (wsOwner, wsJoiner, stateGame) => {
  console.log('stateGame:', stateGame);
  allStatesGame.set(wsOwner.idLobby, stateGame);
  const { widthMap, heightMap, scoreMax } = stateGame.settings;

  const idInterval = setInterval(() => {
    const responseString = JSON.stringify({
      event: 'updateGame',
      stateGame,
    });
    wsOwner.send(responseString);
    wsJoiner.send(responseString);

    stateGame.owner.y = y;
    y += 1;
  }, delayInterval);

  wsOwner.idInterval = idInterval;
  wsJoiner.idInterval = idInterval;
};

export { createStateGameInitial, startLoopGame };
