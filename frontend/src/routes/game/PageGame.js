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
import Countdown from './components/Countdown';

// styles
import styles from './PageGame.module.scss';

const PageGame = () => {
  const [global, setGlobal] = useContextGlobal();
  const [lobby] = useContextLobby();
  const { sendMessage } = useContextWebsocket();
  const stateGame = useGameWsEvents();
  useKeyEvents();

  const { stateApp, isOwnerLobby } = global;
  const { idLobby } = lobby;

  const isStateAppCountdown = stateApp === 'countdown';

  const getHandlerCountdownEnd = () => {
    if (isOwnerLobby)
      return () => {
        sendMessage({ event: 'countdownEnd', idLobby });
        setGlobal((prev) => ({ ...prev, stateApp: 'game' }));
      };

    return () => setGlobal((prev) => ({ ...prev, stateApp: 'game' }));
  };

  return (
    <main className={styles.pageGame}>
      <Game stateGame={stateGame} />
      <TablePlayers stateGame={stateGame} />
      {isStateAppCountdown && (
        <Countdown handleCountownEnd={getHandlerCountdownEnd()} />
      )}
    </main>
  );
};

export default PageGame;
