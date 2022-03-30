const { getRandomInt } = require('./getRandomInt');
const logger = require('./logger');

const getRandomInts = (amount, min, max) => {
  if (amount > max + 1 - min) {
    logger.error('amount bigger than max - min');
    return;
  }

  const randomNumbers = [];

  do {
    const randomNumber = getRandomInt(min, max);
    if (!randomNumbers.includes(randomNumber)) randomNumbers.push(randomNumber);
  } while (randomNumbers.length < 10);

  return randomNumbers;
};

module.exports = { getRandomInts };
