const typesJet = {
  balanced: {
    typeJet: 'balanced',
    sensitivityRotation: 3.5,
    speed: 4,
    color: '#000', // black
    speedBullet: 9,
    timeAliveMaxBullet: 35,
    scale: 1,
  },

  speedster: {
    typeJet: 'speedster',
    sensitivityRotation: 2.5,
    speed: 6,
    color: '#fff', // white
    speedBullet: 11,
    timeAliveMaxBullet: 25,
    scale: 0.8,
  },

  trickster: {
    typeJet: 'trickster',
    sensitivityRotation: 5,
    speed: 3.5,
    color: '#66ff66', // green
    speedBullet: 10,
    timeAliveMaxBullet: 25,
    scale: 1.2,
  },

  tank: {
    typeJet: 'tank',
    sensitivityRotation: 5,
    speed: 2,
    color: '#ff91ff', // purple
    speedBullet: 12,
    timeAliveMaxBullet: 30,
    scale: 1.5,
  },

  'long-laster': {
    typeJet: 'long-laster',
    sensitivityRotation: 2.5,
    speed: 3.5,
    color: '#f4f445', // yellow
    speedBullet: 7,
    timeAliveMaxBullet: 70,
    scale: 1,
  },

  'fast-bullet': {
    typeJet: 'fast-bullet',
    sensitivityRotation: 3,
    speed: 4,
    color: '#4ae9f7', // azure
    speedBullet: 12,
    timeAliveMaxBullet: 30,
    scale: 0.8,
  },
};

const fpsDesired = 61;
const delayInterval = 1000 / fpsDesired;
console.log('delay: ', delayInterval);
const imgW = 48;
const imgH = 48;

module.exports = { typesJet, delayInterval, imgW, imgH };
