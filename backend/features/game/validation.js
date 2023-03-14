const { jetTypes } = require('./config');

const regexp = {
  scoreMax: '^[1-9]|[1-9][0-9]|[1-9][0-9][0-9]|1000$',
  widthMap: '^[2-9][0-9][0-9]|1000$',
  heightMap: '^[2-9][0-9][0-9]|1000$',
};

const areValidSettingsGame = (settings) => {
  const regexpScoreMax = new RegExp(regexp.scoreMax);
  if (!settings.scoreMax.match(regexpScoreMax)) return false;

  const regexpWidthMap = new RegExp(regexp.widthMap);
  if (!settings.widthMap.match(regexpWidthMap)) return false;

  const regexpHeightMap = new RegExp(regexp.heightMap);
  if (!settings.heightMap.match(regexpHeightMap)) return false;

  if (!jetTypes[settings.type]) return false;

  return true;
};

module.exports = { areValidSettingsGame };
