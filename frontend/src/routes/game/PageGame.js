// local components
import Game from './components/Game';
import TablePlayers from './TablePlayers';

// styles
import styles from './PageGame.module.scss';

const PageGame = () => (
  <main className={styles.pageGame}>
    <Game />
    <TablePlayers />
  </main>
);

export default PageGame;
