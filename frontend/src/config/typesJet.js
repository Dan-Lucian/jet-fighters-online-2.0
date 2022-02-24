// assets
import ImgJetBlack from '../assets/jet-000.webp';
import ImgJetWhite from '../assets/jet-fff.webp';
import ImgJetGreen from '../assets/jet-7bfe00.webp';
import ImgJetPurple from '../assets/jet-492051.webp';
import ImgJetOrange from '../assets/jet-fe8500.webp';
import ImgJetRed from '../assets/jet-fe0400.webp';

const typesJet = {
  balanced: {
    typeJet: 'balanced',
    sensitivityRotation: 4,
    speed: 3,
    color: '#000',
    speedBullet: 6,
    timeAliveMaxBullet: 200,
    scale: 1,
    imgJet: ImgJetBlack,
  },

  speedster: {
    typeJet: 'speedster',
    sensitivityRotation: 3,
    speed: 4,
    color: '#fff',
    speedBullet: 6,
    timeAliveMaxBullet: 200,
    scale: 1,
    imgJet: ImgJetWhite,
  },

  trickster: {
    typeJet: 'trickster',
    sensitivityRotation: 5,
    speed: 3,
    color: '#7bfe00',
    speedBullet: 5,
    timeAliveMaxBullet: 200,
    scale: 1,
    imgJet: ImgJetGreen,
  },

  tank: {
    typeJet: 'tank',
    sensitivityRotation: 4,
    speed: 4,
    color: '#492051',
    speedBullet: 6,
    timeAliveMaxBullet: 250,
    scale: 1.5,
    imgJet: ImgJetPurple,
  },

  'long-laster': {
    typeJet: 'long-laster',
    sensitivityRotation: 3,
    speed: 3,
    color: '#fe8500',
    speedBullet: 5,
    timeAliveMaxBullet: 400,
    scale: 1,
    imgJet: ImgJetOrange,
  },

  'fast-bullet': {
    typeJet: 'fast-bullet',
    sensitivityRotation: 4,
    speed: 3,
    color: '#fe0400',
    speedBullet: 8,
    timeAliveMaxBullet: 150,
    scale: 1,
    imgJet: ImgJetRed,
  },
};

export { typesJet };
