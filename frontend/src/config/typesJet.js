// assets
import ImgJetBlack from '../assets/jet-000.webp';
import ImgJetWhite from '../assets/jet-fff.webp';
import ImgJetGreen from '../assets/jet-66ff66.webp';
import ImgJetPurple from '../assets/jet-ff91ff.webp';
import ImgJetYellow from '../assets/jet-f4f445.webp';
import ImgJetAzure from '../assets/jet-4ae9f7.webp';

const arrayImgsJets = [
  ImgJetBlack,
  ImgJetWhite,
  ImgJetGreen,
  ImgJetPurple,
  ImgJetYellow,
  ImgJetAzure,
];

const typesJet = {
  balanced: {
    typeJet: 'balanced',
    sensitivityRotation: 3.5,
    speed: 4,
    color: '#000', // black
    speedBullet: 7,
    timeAliveMaxBullet: 40,
    scale: 1,
  },

  speedster: {
    typeJet: 'speedster',
    sensitivityRotation: 2.5,
    speed: 5,
    color: '#fff', // white
    speedBullet: 8,
    timeAliveMaxBullet: 30,
    scale: 0.8,
  },

  trickster: {
    typeJet: 'trickster',
    sensitivityRotation: 4.5,
    speed: 3.5,
    color: '#66ff66', // green
    speedBullet: 7,
    timeAliveMaxBullet: 30,
    scale: 1.2,
  },

  tank: {
    typeJet: 'tank',
    sensitivityRotation: 4.5,
    speed: 2,
    color: '#ff91ff', // purple
    speedBullet: 9,
    timeAliveMaxBullet: 35,
    scale: 1.5,
  },

  'long-laster': {
    typeJet: 'long-laster',
    sensitivityRotation: 2.5,
    speed: 3.5,
    color: '#f4f445', // yellow
    speedBullet: 6,
    timeAliveMaxBullet: 70,
    scale: 1.1,
  },

  'fast-bullet': {
    typeJet: 'fast-bullet',
    sensitivityRotation: 3,
    speed: 4,
    color: '#4ae9f7', // azure
    speedBullet: 9,
    timeAliveMaxBullet: 35,
    scale: 0.8,
  },
};

Object.values(typesJet).forEach((jet, idx) => {
  jet.imgJet = arrayImgsJets[idx];
});

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
