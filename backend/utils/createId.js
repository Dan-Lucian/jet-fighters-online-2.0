import { getRandomInt } from './getRandomInt.js';

const createId = (length) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnoprstuvwxyz0123456789';

  let result = '';

  for (let i = 0; i < length; i += 1) {
    result += characters[getRandomInt(0, 60)];
  }

  return result;
};

export { createId };
