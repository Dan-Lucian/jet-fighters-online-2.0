const db = require('../../utils/db');

module.exports = {
  updateStats,
};

async function updateStats(stateGame) {
  const { name: nameOwner, type: typeOwner } = stateGame.owner;
  const { name: nameJoiner, type: typeJoiner } = stateGame.joiner;
  const { winner: outcomeGame } = stateGame.settings;

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
      await incrementStats(accountOwner, typeOwner, 'draws');
      await incrementStats(accountJoiner, typeJoiner, 'draws');
      break;

    case 'owner':
      await incrementStats(accountOwner, typeOwner, 'wins');
      await incrementStats(accountJoiner, typeJoiner, 'loses');
      break;

    case 'joiner':
      await incrementStats(accountOwner, typeOwner, 'loses');
      await incrementStats(accountJoiner, typeJoiner, 'wins');
      break;

    case 'quitOwner':
      await incrementStats(accountOwner, typeOwner, 'loses');
      await incrementStats(accountJoiner, typeJoiner, 'wins');
      break;

    case 'quitJoiner':
      await incrementStats(accountOwner, typeOwner, 'wins');
      await incrementStats(accountJoiner, typeJoiner, 'loses');
      break;

    default:
      break;
  }
}

// helper functions
async function incrementStats(account, type, stat) {
  if (!account) return;

  account.stats.total[stat] += 1;
  account.stats[type][stat] += 1;

  await account.save();
}
