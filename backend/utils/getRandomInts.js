import { getRandomInt } from './getRandomInt.js';

const getRandomInts = (amount, min, max) => {
  if (amount > max + 1 - min) {
    console.log('amount bigger than max - min');
    return;
  }

  const randomNumbers = [];

  do {
    const randomNumber = getRandomInt(min, max);
    if (!randomNumbers.includes(randomNumber)) randomNumbers.push(randomNumber);
  } while (randomNumbers.length < 10);

  return randomNumbers;
};

export { getRandomInts };
