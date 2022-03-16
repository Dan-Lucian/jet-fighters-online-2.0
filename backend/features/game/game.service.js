const db = require('../../utils/db');
const { typesJet } = require('./config');
const logger = require('../../utils/logger');

module.exports = {
  updateStatsInDb,
  updateStatsJetsInDb,
};

async function updateStatsInDb(nameOwner, nameJoiner, outcomeGame) {
  const accountOwner =
    nameOwner === 'Anon'
      ? null
      : await db.Account.findOne({ userName: nameOwner });
  const accountJoiner =
    nameJoiner === 'Anon'
      ? null
      : await db.Account.findOne({ userName: nameJoiner });

  switch (outcomeGame) {
    case 'draw':
      await incrementStat(accountOwner, 'draws');
      await incrementStat(accountJoiner, 'draws');
      break;

    case 'owner':
      await incrementStat(accountOwner, 'wins');
      await incrementStat(accountJoiner, 'loses');
      break;

    case 'joiner':
      await incrementStat(accountOwner, 'loses');
      await incrementStat(accountJoiner, 'wins');
      break;

    case 'quitOwner':
      await incrementStat(accountOwner, 'loses');
      await incrementStat(accountJoiner, 'wins');
      break;

    case 'quitJoiner':
      await incrementStat(accountOwner, 'wins');
      await incrementStat(accountJoiner, 'loses');
      break;

    default:
      break;
  }
}

async function updateStatsJetsInDb({
  nameOwner,
  typeJetOwner,
  nameJoiner,
  typeJetJoiner,
}) {
  const accountOwner =
    nameOwner === 'Anon'
      ? null
      : await db.Account.findOne({ userName: nameOwner });
  const accountJoiner =
    nameJoiner === 'Anon'
      ? null
      : await db.Account.findOne({ userName: nameJoiner });

  await updateGamesWithJet(accountOwner, typeJetOwner);
  await updateGamesWithJet(accountJoiner, typeJetJoiner);
}

// helper functions
async function incrementStat(account, stat) {
  if (!account) return;

  account.stats[stat] += 1;

  await account.save();
}

async function updateGamesWithJet(account, typeJet) {
  switch (typeJet) {
    case typesJet.balanced.typeJet:
      account.stats.gamesWithBalanced += 1;
      await account.save();
      break;

    case typesJet.speedster.typeJet:
      account.stats.gamesWithSpeedster += 1;
      await account.save();
      break;

    case typesJet.trickster.typeJet:
      account.stats.gamesWithTrickster += 1;
      await account.save();
      break;

    case typesJet.tank.typeJet:
      account.stats.gamesWithTank += 1;
      await account.save();
      break;

    case typesJet['long-laster'].typeJet:
      account.stats.gamesWithLongLaster += 1;
      await account.save();
      break;

    case typesJet['fast-bullet'].typeJet:
      account.stats.gamesWithFastBullet += 1;
      await account.save();
      break;

    default:
      logger.error('No such jet type');
      break;
  }
}
