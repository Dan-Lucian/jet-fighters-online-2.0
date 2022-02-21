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
  }, delayInterval);

  wsOwner.idInterval = idInterval;
  wsJoiner.idInterval = idInterval;
};

// Moves the jet/bullet one tick towards the direction it is facing
// based on it's speed value.
// Steers left/right according to jet's rotation sensitivity.
const goTheWayIsFacing = (statePlayer) => {
  const { isPressedArrowRight, isPressedArrowLeft, sensitivityRotation } =
    statePlayer;

  if (isPressedArrowRight) statePlayer.angle -= sensitivityRotation;
  if (isPressedArrowLeft) statePlayer.angle += sensitivityRotation;

  const rad = (statePlayer.angle * Math.PI) / 180;
  statePlayer.x += statePlayer.speed * Math.sin(rad);
  statePlayer.y += statePlayer.speed * Math.cos(rad);
};

export { createStateGameInitial, startLoopGame };
