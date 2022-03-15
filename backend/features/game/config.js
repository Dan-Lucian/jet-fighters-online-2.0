const typesJet = {
  balanced: {
    typeJet: 'balanced',
    sensitivityRotation: 4,
    speed: 3,
    color: '#000',
    speedBullet: 6,
    timeAliveMaxBullet: 200,
    scale: 1,
  },

  speedster: {
    typeJet: 'speedster',
    sensitivityRotation: 3,
    speed: 4,
    color: '#fff',
    speedBullet: 6,
    timeAliveMaxBullet: 200,
    scale: 1,
  },

  trickster: {
    typeJet: 'trickster',
    sensitivityRotation: 5,
    speed: 3,
    color: '#7bfe00',
    speedBullet: 5,
    timeAliveMaxBullet: 200,
    scale: 1,
  },

  tank: {
    typeJet: 'tank',
    sensitivityRotation: 4,
    speed: 4,
    color: '#492051',
    speedBullet: 6,
    timeAliveMaxBullet: 250,
    scale: 1.5,
  },

  'long-laster': {
    typeJet: 'long-laster',
    sensitivityRotation: 3,
    speed: 3,
    color: '#fe8500',
    speedBullet: 5,
    timeAliveMaxBullet: 400,
    scale: 1,
  },

  'fast-bullet': {
    typeJet: 'fast-bullet',
    sensitivityRotation: 4,
    speed: 3,
    color: '#fe0400',
    speedBullet: 8,
    timeAliveMaxBullet: 150,
    scale: 1,
  },
};

const delayInterval = 1000 / 60;
const imgW = 48;
const imgH = 48;

module.exports = { typesJet, delayInterval, imgW, imgH };
