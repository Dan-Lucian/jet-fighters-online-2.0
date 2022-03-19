const typesJet = {
  balanced: {
    typeJet: 'balanced',
    sensitivityRotation: 4,
    speed: 5,
    color: '#000',
    speedBullet: 10,
    timeAliveMaxBullet: 90,
    scale: 1,
  },

  speedster: {
    typeJet: 'speedster',
    sensitivityRotation: 3,
    speed: 7,
    color: '#fff',
    speedBullet: 10,
    timeAliveMaxBullet: 80,
    scale: 0.8,
  },

  trickster: {
    typeJet: 'trickster',
    sensitivityRotation: 6,
    speed: 5,
    color: '#7bfe00',
    speedBullet: 10,
    timeAliveMaxBullet: 70,
    scale: 1.2,
  },

  tank: {
    typeJet: 'tank',
    sensitivityRotation: 6,
    speed: 2,
    color: '#492051',
    speedBullet: 12,
    timeAliveMaxBullet: 100,
    scale: 1.5,
  },

  'long-laster': {
    typeJet: 'long-laster',
    sensitivityRotation: 3,
    speed: 5,
    color: '#fe8500',
    speedBullet: 8,
    timeAliveMaxBullet: 200,
    scale: 1,
  },

  'fast-bullet': {
    typeJet: 'fast-bullet',
    sensitivityRotation: 2,
    speed: 5,
    color: '#fe0400',
    speedBullet: 12,
    timeAliveMaxBullet: 50,
    scale: 0.8,
  },
};

const fps = 30;
const delayInterval = 1000 / fps;
console.log('delay: ', delayInterval);
const imgW = 48;
const imgH = 48;

module.exports = { typesJet, delayInterval, imgW, imgH };
