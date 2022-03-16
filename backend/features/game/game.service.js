const db = require('../../utils/db');

module.exports = {
  updateStats,
};

async function updateStats(stateGame) {
  const { name: nameOwner, typeJet: typeJetOwner } = stateGame.owner;
  const { name: nameJoiner, typeJet: typeJetJoiner } = stateGame.joiner;
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
      await incrementStats(accountOwner, typeJetOwner, 'draws');
      await incrementStats(accountJoiner, typeJetJoiner, 'draws');
      break;

    case 'owner':
      await incrementStats(accountOwner, typeJetOwner, 'wins');
      await incrementStats(accountJoiner, typeJetJoiner, 'loses');
      break;

    case 'joiner':
      await incrementStats(accountOwner, typeJetOwner, 'loses');
      await incrementStats(accountJoiner, typeJetJoiner, 'wins');
      break;

    case 'quitOwner':
      await incrementStats(accountOwner, typeJetOwner, 'loses');
      await incrementStats(accountJoiner, typeJetJoiner, 'wins');
      break;

    case 'quitJoiner':
      await incrementStats(accountOwner, typeJetOwner, 'wins');
      await incrementStats(accountJoiner, typeJetJoiner, 'loses');
      break;

    default:
      break;
  }
}

// helper functions
async function incrementStats(account, typeJet, stat) {
  if (!account) return;

  account.stats.total[stat] += 1;
  account.stats[typeJet][stat] += 1;

  await account.save();
}
