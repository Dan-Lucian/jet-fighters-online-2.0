// shared hooks
import { useContextGlobal } from '../../providers/ProviderGlobal';

// local hooks
import useGameWsEvents from './hooks/useGameWsEvents';
import useKeyEvents from './hooks/useKeyEvents';

// shared components
import PageNonexistent from '../../components/PageNonexistent/PageNonexistent';

// local components
import Game from './components/Game/Game';
import TablePlayers from './components/PlayersTable/PlayersTable';
import Overlay from './components/Overlay/Overlay';

// styles
import styles from './PageGame.module.scss';

const PageGame = () => {
  const [{ stateApp }] = useContextGlobal();
  const stateGame = useGameWsEvents();
  useKeyEvents();

  // const isStateAppNotGame =
  //   !stateApp || stateApp === 'lobby' || stateApp === 'preLobby';
  // if (isStateAppNotGame) return <PageNonexistent />;

  return (
    <main className={styles.pageGame}>
      <Game stateGame={stateGame} />
      <TablePlayers gameState={stateGame} />
      <Overlay />
    </main>
  );
};

export default PageGame;
