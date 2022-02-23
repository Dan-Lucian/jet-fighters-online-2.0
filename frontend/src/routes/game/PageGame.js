// shared hooks
import { useContextGlobal } from '../../providers/ProviderGlobal';
import { useContextLobby } from '../../providers/ProviderLobby';
import { useContextWebsocket } from '../../providers/ProviderWebsocket';

// local hooks
import { useGameWsEvents } from './hooks/useGameWsEvents';
import { useKeyEvents } from './hooks/useKeyEvents';

// local components
import Game from './components/Game';
import TablePlayers from './components/TablePlayers';
import Overlay from './components/Overlay';

// styles
import styles from './PageGame.module.scss';

const PageGame = () => {
  const stateGame = useGameWsEvents();
  useKeyEvents();

  return (
    <main className={styles.pageGame}>
      <Game stateGame={stateGame} />
      <TablePlayers stateGame={stateGame} />
      <Overlay />
    </main>
  );
};

export default PageGame;
