/* eslint-disable no-use-before-define */
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
      isPressedArrowLeft: false,
      isPressedArrowRight: false,
      spacePressed: false,
      bullets: [],
      score: 0,
      playerNumber: 'p1',
      ...typesJet[lobby.owner.typeJet],
    },
    joiner: {
      name: lobby.joiner.name,
      typeJet: lobby.joiner.typeJet,
      x: getRandomInt(imgW, widthMap - imgW),
      y: getRandomInt(imgH, heightMap - imgH),
      angle: getRandomInt(0, 360),
      scale: 1,
      isPressedArrowLeft: false,
      isPressedArrowRight: false,
      spacePressed: false,
      bullets: [],
      score: 0,
      playerNumber: 'p2',
      ...typesJet[lobby.joiner.typeJet],
    },
    settings: {
      winPlayer: null,
      ...lobby.settings,
    },
    countFrame: 0,
  };
};

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

    const { owner, joiner } = stateGame;
    const bulletLanded = false;

    goTheWayIsFacing(owner);
    goTheWayIsFacing(joiner);

    if (isOutOfBounds(owner, widthMap, heightMap))
      teleportToOppositeSide(owner, widthMap, heightMap);
    if (isOutOfBounds(joiner, widthMap, heightMap))
      teleportToOppositeSide(joiner, widthMap, heightMap);
  }, delayInterval);

  wsOwner.idInterval = idInterval;
  wsJoiner.idInterval = idInterval;
};

// Moves the jet/bullet one tick towards the direction it is facing
// based on it's speed value.
// Steers left/right according to jet's rotation sensitivity.
const goTheWayIsFacing = (state) => {
  const { isPressedArrowRight, isPressedArrowLeft, sensitivityRotation } =
    state;

  if (isPressedArrowRight) state.angle -= sensitivityRotation;
  if (isPressedArrowLeft) state.angle += sensitivityRotation;

  const rad = (state.angle * Math.PI) / 180;
  state.x += state.speed * Math.sin(rad);
  state.y += state.speed * Math.cos(rad);
};

// Returns true if the element is out of map's bounds.
const isOutOfBounds = (state, widthMap, heightMap) => {
  const { x, y } = state;

  return x < 0 || x > widthMap || y < 0 || y > heightMap;
};

const teleportToOppositeSide = (state, widthMap, heightMap) => {
  const { x, y } = state;

  if (x < 0) {
    state.x = widthMap - 1;
    return;
  }

  if (x > widthMap) {
    state.x = 1;
    return;
  }

  if (y < 0) {
    state.y = heightMap - 1;
    return;
  }

  if (y > heightMap) {
    state.y = 1;
  }
};

export { createStateGameInitial, startLoopGame };
