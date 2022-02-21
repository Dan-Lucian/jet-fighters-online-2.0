/* eslint-disable no-use-before-define */
import { useLocation } from 'react-router-dom';

// shared hooks
import { useContextGlobal } from '../../providers/ProviderGlobal';
import { useContextLobby } from '../../providers/ProviderLobby';
import { useContextWebsocket } from '../../providers/ProviderWebsocket';

// local hooks
import { useGameWsEvents } from './hooks/useGameWsEvents';

// local components
import Game from './components/Game';
import TablePlayers from './components/TablePlayers';
import Countdown from './components/Countdown';

// styles
import styles from './PageGame.module.scss';

const PageGame = () => {
  useGameWsEvents();
  const { state: stateGameInitial } = useLocation();
  const [global, setGlobal] = useContextGlobal();
  const [lobby] = useContextLobby();
  const { message, sendMessage } = useContextWebsocket();

  const { stateApp, isOwnerLobby } = global;
  const { idLobby } = lobby;
  const { stateGame } = message;

  const isStateAppCountdown = stateApp === 'countdown';
  const stateGameValid = stateGame || stateGameInitial || stateGameDefault;

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
      <Game stateGame={stateGameValid} />
      <TablePlayers stateGame={stateGameValid} />
      {isStateAppCountdown && (
        <Countdown handleCountownEnd={getHandlerCountdownEnd()} />
      )}
    </main>
  );
};

const stateGameDefault = {
  joiner: {
    name: '_____ ',
    score: 0,
  },
  owner: {
    name: '_____ ',
    score: 0,
  },
  settings: {
    scoreMax: '0',
    widthMap: 600,
    heightMap: 300,
  },
};

export default PageGame;
