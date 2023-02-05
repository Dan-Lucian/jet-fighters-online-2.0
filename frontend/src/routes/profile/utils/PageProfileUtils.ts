import { IAllJetsStats, IJetStats } from 'routes/profile/interfaces/IAllJetsStats';
import { JetTypeEnum } from 'enums/JetTypeEnum';

/**
 * Sorts jets in a descending order by theit total amount of games.
 * @param {object} jets
 * @returns {object} sorted jets.
 */
export function sortJetsDescendingByTotalGamesAmount(jets: IAllJetsStats): [JetTypeEnum, IJetStats][] {
  const entries = Object.entries(jets) as [JetTypeEnum, IJetStats][];
  return entries.sort((x, y) => y[1].wins + y[1].loses + y[1].draws - (x[1].wins + x[1].loses + x[1].draws));
}

/**
 * Sums up each individual stat across all jets.
 * @param {object} jets
 * @returns {object} sumed up stats.
 */
export function sumAllJetsStats(jets: [JetTypeEnum, IJetStats][]): IJetStats {
  return jets.reduce(
    (accumulator, jetType) => {
      return {
        wins: accumulator.wins + jetType[1].wins,
        loses: accumulator.loses + jetType[1].loses,
        draws: accumulator.draws + jetType[1].draws,
      };
    },
    {
      wins: 0,
      loses: 0,
      draws: 0,
    }
  );
}
