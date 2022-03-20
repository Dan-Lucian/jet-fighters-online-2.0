const typesJet = {
  balanced: {
    typeJet: 'balanced',
    sensitivityRotation: 3.5,
    speed: 4,
    color: '#000', // black
    speedBullet: 7,
    timeAliveMaxBullet: 60,
    scale: 1,
  },

  speedster: {
    typeJet: 'speedster',
    sensitivityRotation: 2.5,
    speed: 5,
    color: '#fff', // white
    speedBullet: 8,
    timeAliveMaxBullet: 55,
    scale: 0.9,
  },

  trickster: {
    typeJet: 'trickster',
    sensitivityRotation: 4.5,
    speed: 3.5,
    color: '#66ff66', // green
    speedBullet: 7,
    timeAliveMaxBullet: 65,
    scale: 1.2,
  },

  tank: {
    typeJet: 'tank',
    sensitivityRotation: 4.5,
    speed: 2,
    color: '#ff91ff', // purple
    speedBullet: 9,
    timeAliveMaxBullet: 50,
    scale: 1.5,
  },

  micro: {
    typeJet: 'micro',
    sensitivityRotation: 3,
    speed: 3,
    color: '#f4f445', // yellow
    speedBullet: 6,
    timeAliveMaxBullet: 65,
    scale: 0.6,
  },

  'fast-bullet': {
    typeJet: 'fast-bullet',
    sensitivityRotation: 3,
    speed: 4,
    color: '#4ae9f7', // azure
    speedBullet: 9,
    timeAliveMaxBullet: 50,
    scale: 0.8,
  },
};

const fpsDesired = 61;
const delayInterval = 1000 / fpsDesired;

const imgW = 48;
const imgH = 48;

module.exports = { typesJet, delayInterval, imgW, imgH };
