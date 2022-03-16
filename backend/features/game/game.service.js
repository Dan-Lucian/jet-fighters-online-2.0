const db = require('../../utils/db');

module.exports = {
  updateStatsInDb,
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

// helper functions
async function incrementStat(account, stat) {
  if (!account) return;

  account.stats[stat] += 1;

  await account.save();
}
