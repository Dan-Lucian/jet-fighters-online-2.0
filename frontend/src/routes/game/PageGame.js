import { useRef, useEffect } from 'react';

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
  const [global, setGlobal] = useContextGlobal();
  const { message, sendMessage } = useContextWebsocket();

  const { stateApp, isOwnerLobby } = global;
  const { event, stateGame } = message;

  const isStateAppCountdown = stateApp === 'countdown';
  const isStateAppGame = stateApp === 'game';

  useEffect(() => {
    if (isStateAppGame && event === 'updateGame') {
      console.log('EVENT: updateGame');
      // stateGameCurrent.current = stateGameReceived;
    }
  }, [message]);

  const getHandlerCountdownEnd = () => {
    if (isOwnerLobby)
      return () => {
        sendMessage({ event: 'countdownEnd', stateGame });
        setGlobal((prev) => ({ ...prev, stateApp: 'game' }));
      };

    return () => setGlobal((prev) => ({ ...prev, stateApp: 'game' }));
  };

  return (
    <main className={styles.pageGame}>
      <Game stateGame={stateGame} />
      <TablePlayers />
      {isStateAppCountdown && (
        <Countdown handleCountownEnd={getHandlerCountdownEnd()} />
      )}
    </main>
  );
};

export default PageGame;
