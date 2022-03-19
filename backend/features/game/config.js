const typesJet = {
  balanced: {
    typeJet: 'balanced',
    sensitivityRotation: 3.5,
    speed: 4,
    color: '#000',
    speedBullet: 9,
    timeAliveMaxBullet: 35,
    scale: 1,
  },

  speedster: {
    typeJet: 'speedster',
    sensitivityRotation: 2.5,
    speed: 6,
    color: '#fff',
    speedBullet: 11,
    timeAliveMaxBullet: 25,
    scale: 0.8,
  },

  trickster: {
    typeJet: 'trickster',
    sensitivityRotation: 5,
    speed: 3.5,
    color: '#7bfe00',
    speedBullet: 10,
    timeAliveMaxBullet: 25,
    scale: 1.2,
  },

  tank: {
    typeJet: 'tank',
    sensitivityRotation: 5,
    speed: 2,
    color: '#492051',
    speedBullet: 12,
    timeAliveMaxBullet: 30,
    scale: 1.5,
  },

  'long-laster': {
    typeJet: 'long-laster',
    sensitivityRotation: 2.5,
    speed: 3.5,
    color: '#fe8500',
    speedBullet: 7,
    timeAliveMaxBullet: 70,
    scale: 1,
  },

  'fast-bullet': {
    typeJet: 'fast-bullet',
    sensitivityRotation: 3,
    speed: 4,
    color: '#fe0400',
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
