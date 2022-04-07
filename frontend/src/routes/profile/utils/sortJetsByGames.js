const sortJetsByGames = (jets) =>
  Object.entries(jets).sort(
    (x, y) =>
      y[1].wins +
      y[1].loses +
      y[1].draws -
      (x[1].wins + x[1].loses + x[1].draws)
  );

export default sortJetsByGames;
