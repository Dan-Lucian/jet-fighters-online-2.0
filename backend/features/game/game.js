// helpers
const { getRandomInt } = require('../../utils/getRandomInt');
const { typesJet, delayInterval, imgW, imgH } = require('./config');
const logger = require('../../utils/logger');
const helperLobby = require('./lobby');

// services
const gameService = require('./game.service');

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
      isPressedLeft: false,
      isPressedRight: false,
      isPressedFire: false,
      bullets: [],
      score: 0,
      isOwner: true,
      ...typesJet[lobby.owner.typeJet],
    },
    joiner: {
      name: lobby.joiner.name,
      typeJet: lobby.joiner.typeJet,
      x: getRandomInt(imgW, widthMap - imgW),
      y: getRandomInt(imgH, heightMap - imgH),
      angle: getRandomInt(0, 360),
      isPressedLeft: false,
      isPressedRight: false,
      isPressedFire: false,
      bullets: [],
      score: 0,
      isOwner: false,
      ...typesJet[lobby.joiner.typeJet],
    },
    settings: {
      winner: null,
      ...lobby.settings,
    },
    countFrame: 0,
  };
};

const hasOneSecondPassed = (time) => {
  if (Date.now() - time > 1000) return true;
};

let fps = 0;
let timeStart = Date.now();

const startLoopGame = (lobby) => {
  const wsOwner = lobby.owner.ws;
  const wsJoiner = lobby.joiner.ws;
  const { stateGame } = lobby;

  allStatesGame.set(wsOwner.idLobby, stateGame);
  const { widthMap, heightMap, scoreMax } = stateGame.settings;

  let timeStartInterval = Date.now();
  let timeEndInterval = Date.now();

  const idInterval = setInterval(() => {
    timeStartInterval = Date.now();
    const timeBetweenIntervals = timeStartInterval - timeEndInterval;
    console.log('time between intervals: ', timeBetweenIntervals);

    const sizeTick =
      Math.round((timeBetweenIntervals / delayInterval) * 100) / 100;
    console.log('SIZE TICK: ', sizeTick);

    if (hasOneSecondPassed(timeStart)) {
      console.log('FPS: ', fps);
      fps = 0;
      timeStart = Date.now();
    } else {
      fps += 1;
    }

    const { owner, joiner } = stateGame;

    sendStateGame([wsOwner, wsJoiner], stateGame);

    goTheWayIsFacing(owner);
    goTheWayIsFacing(joiner);

    if (isOutOfBounds(owner, widthMap, heightMap))
      teleportToOppositeSide(owner, widthMap, heightMap);
    if (isOutOfBounds(joiner, widthMap, heightMap))
      teleportToOppositeSide(joiner, widthMap, heightMap);

    if (didJetsCollide(stateGame)) {
      resetPositionJets([owner, joiner], widthMap, heightMap);
      incrementScores([owner, joiner], 1);
    }

    updateLocationBullets([owner, joiner], widthMap, heightMap);
    destroyOldBullets([owner, joiner]);
    updateScoreIfBulletLand(owner, joiner, widthMap, heightMap);
    createNewBulletsIfFirePressed([owner, joiner]);

    const winner = getWinner([owner, joiner], scoreMax);
    if (winner) {
      clearInterval(idInterval);
      updateWins(lobby, winner);
      sendGameOver([wsOwner, wsJoiner], lobby);
      gameService
        .updateStats(stateGame)
        .catch((error) => logger.error('Error caught: ', error));
      helperLobby.removeStateGame(lobby.settings.idLobby);
    }

    timeEndInterval = Date.now();
    const timeExecutionInterval = timeEndInterval - timeStartInterval;
    // console.log('Execution time', timeExecutionInterval);
  }, delayInterval);

  // createNewBulletsIfSpaceWasPressed(owner, joiner);

  wsOwner.idInterval = idInterval;
  wsJoiner.idInterval = idInterval;
};

const sendStateGame = (arrayWs, stateGame) => {
  const responseString = JSON.stringify({
    event: 'updateGame',
    stateGame,
  });

  for (let i = 0; i < arrayWs.length; i += 1) {
    arrayWs[i].send(responseString);
  }
};

const sendGameOver = (arrayWs, lobby) => {
  const { winner } = lobby.stateGame.settings;
  const { wins: winsOwner } = lobby.owner;
  const { wins: winsJoiner } = lobby.joiner;
  const { stateGame } = lobby;

  const responseString = JSON.stringify({
    event: 'gameOver',
    winner,
    winsOwner,
    winsJoiner,
    stateGame,
  });

  for (let i = 0; i < arrayWs.length; i += 1) {
    arrayWs[i].send(responseString);
  }
};

// Moves the jet/bullet one tick towards the direction it is facing
// based on it's speed value.
// Steers left/right according to jet's rotation sensitivity.
const goTheWayIsFacing = (stateEntity) => {
  const { isPressedRight, isPressedLeft, sensitivityRotation } = stateEntity;

  if (isPressedRight) stateEntity.angle -= sensitivityRotation;
  if (isPressedLeft) stateEntity.angle += sensitivityRotation;

  const rad = (stateEntity.angle * Math.PI) / 180;
  stateEntity.x += stateEntity.speed * Math.sin(rad);
  stateEntity.y += stateEntity.speed * Math.cos(rad);
};

// Returns true if the element is out of map's bounds.
const isOutOfBounds = (stateEntity, widthMap, heightMap) => {
  const { x, y } = stateEntity;

  return x < 0 || x > widthMap || y < 0 || y > heightMap;
};

const teleportToOppositeSide = (stateEntity, widthMap, heightMap) => {
  const { x, y } = stateEntity;

  if (x < 0) {
    stateEntity.x = widthMap - 1;
    return;
  }

  if (x > widthMap) {
    stateEntity.x = 1;
    return;
  }

  if (y < 0) {
    stateEntity.y = heightMap - 1;
    return;
  }

  if (y > heightMap) {
    stateEntity.y = 1;
  }
};

const didJetsCollide = (stateGame) => {
  const { x: x1, y: y1, scale: scale1 } = stateGame.owner;
  const { x: x2, y: y2, scale: scale2 } = stateGame.joiner;

  // 4 borders of the jet
  const left1 = x1 - (imgW * scale1) / 2;
  const right1 = x1 + (imgW * scale1) / 2;
  const top1 = y1 - (imgH * scale1) / 2;
  const bottom1 = y1 + (imgH * scale1) / 2;

  const left2 = x2 - (imgW * scale2) / 2;
  const right2 = x2 + (imgW * scale2) / 2;
  const top2 = y2 - (imgH * scale2) / 2;
  const bottom2 = y2 + (imgH * scale2) / 2;

  // check for any corner entering another jet square area
  return (
    (left1 > left2 && left1 < right2 && top1 > top2 && top1 < bottom2) ||
    (right1 > left2 && right1 < right2 && top1 > top2 && top1 < bottom2) ||
    (right1 > left2 &&
      right1 < right2 &&
      bottom1 > top2 &&
      bottom1 < bottom2) ||
    (left1 > left2 && left1 < right2 && bottom1 > top2 && bottom1 < bottom2)
  );
};

const resetPositionJets = (arrayStates, widthMap, heightMap) => {
  for (let i = 0; i < arrayStates.length; i += 1) {
    const { scale } = arrayStates[i];

    arrayStates[i].x = getRandomInt(imgW * scale, widthMap - imgW * scale);
    arrayStates[i].y = getRandomInt(imgH * scale, heightMap - imgH * scale);

    arrayStates[i].angle = getRandomInt(0, 360);
  }
};

const createNewBulletsIfFirePressed = (arrayStates) => {
  for (let i = 0; i < arrayStates.length; i += 1) {
    if (arrayStates[i].isPressedFire) {
      arrayStates[i].isPressedFire = false;

      const [bullet1, bullet2] = createBulletsFor(arrayStates[i]);
      arrayStates[i].bullets.push(bullet1);
      arrayStates[i].bullets.push(bullet2);
    }
  }
};

const createBulletsFor = (statePlayer) => {
  const { x, y, angle, speedBullet, color, scale } = statePlayer;

  const rad1 = ((angle + 100) * Math.PI) / 180;
  const bullet1 = {
    x: x + (imgW / 2 - 1) * scale * Math.sin(rad1) - 2,
    y: y + (imgH / 2 - 1) * scale * Math.cos(rad1) - 2,
    angle,
    speed: speedBullet,
    color,
    timeAlive: 0,
  };

  const rad2 = ((angle - 100) * Math.PI) / 180;
  const bullet2 = {
    x: x + (imgW / 2 - 1) * scale * Math.sin(rad2) - 2,
    y: y + (imgH / 2 - 1) * scale * Math.cos(rad2) - 2,
    angle,
    speed: speedBullet,
    color,
    timeAlive: 0,
  };

  return [bullet1, bullet2];
};

const updateLocationBullets = (arrayStates, widthMap, heightMap) => {
  for (let i = 0; i < arrayStates.length; i += 1) {
    for (let j = 0; j < arrayStates[i].bullets.length; j += 1) {
      arrayStates[i].bullets[j].timeAlive += 1;

      goTheWayIsFacing(arrayStates[i].bullets[j]);

      if (isOutOfBounds(arrayStates[i].bullets[j], widthMap, heightMap))
        teleportToOppositeSide(arrayStates[i].bullets[j], widthMap, heightMap);
    }
  }
};

const destroyOldBullets = (arrayStates) => {
  for (let i = 0; i < arrayStates.length; i += 1) {
    for (let j = arrayStates[i].bullets.length - 1; j > -1; j -= 1) {
      if (
        arrayStates[i].bullets[j].timeAlive > arrayStates[i].timeAliveMaxBullet
      ) {
        arrayStates[i].bullets.splice(j, 1);
      }
    }
  }
};

const updateScoreIfBulletLand = (
  statePlayer1,
  statePlayer2,
  widthMap,
  heightMap
) => {
  for (let i = statePlayer1.bullets.length - 1; i > -1; i -= 1) {
    const didBulletLand = checkBulletLand(
      statePlayer1.bullets[i],
      statePlayer2
    );

    if (didBulletLand) {
      incrementScores([statePlayer1], 1);
      resetPositionJets([statePlayer2], widthMap, heightMap);
      statePlayer1.bullets.splice(i, 1);
      return;
    }
  }

  for (let i = statePlayer2.bullets.length - 1; i > -1; i -= 1) {
    const didBulletLand = checkBulletLand(
      statePlayer2.bullets[i],
      statePlayer1
    );

    if (didBulletLand) {
      incrementScores([statePlayer2], 1);
      resetPositionJets([statePlayer1], widthMap, heightMap);
      statePlayer2.bullets.splice(i, 1);
      return;
    }
  }
};

const checkBulletLand = (stateBullet, stateEnemy) => {
  const { x: xJet, y: yJet, scale } = stateEnemy;
  const { x: xBullet, y: yBullet } = stateBullet;

  const left = xJet - (imgW * scale) / 2;
  const right = xJet + (imgW * scale) / 2;
  const top = yJet - (imgH * scale) / 2;
  const bottom = yJet + (imgH * scale) / 2;

  return xBullet > left && xBullet < right && yBullet > top && yBullet < bottom;
};

const incrementScores = (arrayStates, amount) => {
  for (let i = 0; i < arrayStates.length; i += 1) {
    arrayStates[i].score += amount;
  }
};

const getWinner = (arrayStates, scoreMax) => {
  const winners = [];

  for (let i = 0; i < arrayStates.length; i += 1) {
    if (arrayStates[i].score >= scoreMax) winners.push(arrayStates[i]);
  }

  if (winners.length === 1) return winners[0].isOwner ? 'owner' : 'joiner';

  if (winners.length > 1) return 'draw';

  return null;
};

const updateWins = (lobby, winner) => {
  lobby.stateGame.settings.winner = winner;

  if (winner === 'draw') return;

  lobby[winner].wins += 1;
};

const injectInputIntoGame = (message, stateGame) => {
  const {
    isOwnerLobby,
    isPressedRight,
    isPressedLeft,
    isPressedFire,
    isReleasedRight,
    isReleasedLeft,
  } = message;

  const whoIsPlayer = isOwnerLobby ? 'owner' : 'joiner';

  stateGame[whoIsPlayer].isPressedFire = isPressedFire;

  const isPressedRightSaved = stateGame[whoIsPlayer].isPressedRight;
  stateGame[whoIsPlayer].isPressedRight =
    isPressedRight ||
    (!isPressedRight && !isReleasedRight && isPressedRightSaved);

  const isPressedLeftSaved = stateGame[whoIsPlayer].isPressedLeft;
  stateGame[whoIsPlayer].isPressedLeft =
    isPressedLeft || (!isPressedLeft && !isReleasedLeft && isPressedLeftSaved);
};

module.exports = { createStateGameInitial, startLoopGame, injectInputIntoGame };
