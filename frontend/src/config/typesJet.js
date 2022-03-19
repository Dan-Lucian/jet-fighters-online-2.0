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
    sensitivityRotation: 3.5,
    speed: 4,
    color: '#000',
    speedBullet: 9,
    timeAliveMaxBullet: 35,
    scale: 1,
    imgJet: ImgJetBlack,
  },

  speedster: {
    typeJet: 'speedster',
    sensitivityRotation: 2.5,
    speed: 6,
    color: '#fff',
    speedBullet: 11,
    timeAliveMaxBullet: 25,
    scale: 0.8,
    imgJet: ImgJetWhite,
  },

  trickster: {
    typeJet: 'trickster',
    sensitivityRotation: 5,
    speed: 3.5,
    color: '#7bfe00',
    speedBullet: 10,
    timeAliveMaxBullet: 25,
    scale: 1.2,
    imgJet: ImgJetGreen,
  },

  tank: {
    typeJet: 'tank',
    sensitivityRotation: 5,
    speed: 2,
    color: '#492051',
    speedBullet: 12,
    timeAliveMaxBullet: 30,
    scale: 1.5,
    imgJet: ImgJetPurple,
  },

  'long-laster': {
    typeJet: 'long-laster',
    sensitivityRotation: 2.5,
    speed: 3.5,
    color: '#fe8500',
    speedBullet: 7,
    timeAliveMaxBullet: 70,
    scale: 1,
    imgJet: ImgJetOrange,
  },

  'fast-bullet': {
    typeJet: 'fast-bullet',
    sensitivityRotation: 3,
    speed: 4,
    color: '#fe0400',
    speedBullet: 12,
    timeAliveMaxBullet: 30,
    scale: 0.8,
    imgJet: ImgJetRed,
  },
};

const typesJetStandartized = standartizeStatsJets(typesJet);

function standartizeStatsJets(jets) {
  const copyJets = JSON.parse(JSON.stringify(jets));
  Object.values(copyJets).forEach((jet) => {
    delete jet.typeJet;
    delete jet.color;
    delete jet.imgJet;

    Object.keys(jet).forEach((key) =>
      standartizeProp(jet, key, getMin(jets, key), getMax(jets, key))
    );
  });

  return copyJets;
}

function getMin(object, prop) {
  return Math.min(...Object.values(object).map((value) => value[prop]));
}

function getMax(object, prop) {
  return Math.max(...Object.values(object).map((value) => value[prop]));
}

function standartizeProp(object, prop, min, max) {
  const temp = object[prop];

  const result = (temp - min) / (max - min);

  // (1 + ...) to start from 1
  // (... * 5) to standartize on 5 steps
  const resultRounded =
    1 + (Math.round((result + Number.EPSILON) * 100) / 100) * 5;

  object[prop] = resultRounded;
}

export { typesJet, typesJetStandartized };
