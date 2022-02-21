/* eslint-disable no-use-before-define */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// shared hooks
import { useContextGlobal } from '../../providers/ProviderGlobal';
import { useContextWebsocket } from '../../providers/ProviderWebsocket';

// local components
import Game from './components/Game';
import TablePlayers from './components/TablePlayers';
import Countdown from './components/Countdown';

// styles
import styles from './PageGame.module.scss';

const PageGame = () => {
  const { state: stateGameInitial } = useLocation();
  const [global, setGlobal] = useContextGlobal();
  const { message, sendMessage } = useContextWebsocket();

  const { stateApp, isOwnerLobby } = global;
  const { event, stateGame } = message;

  const isStateAppCountdown = stateApp === 'countdown';
  const isStateAppGame = stateApp === 'game';
  const stateGameValid = stateGame || stateGameInitial || stateGameDefault;

  useEffect(() => {
    if (isStateAppGame && event === 'updateGame') {
      console.log('EVENT: updateGame');
      // stateGameCurrent.current = stateGameReceived;
    }
  }, [message]);

  const getHandlerCountdownEnd = () => {
    if (isOwnerLobby)
      return () => {
        sendMessage({ event: 'countdownEnd', stateGameInitial });
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
