import { useState, useRef, useEffect } from 'react';

// shared hooks
import { useContextGame } from '../../providers/ProviderGame';
import { useContextUser } from '../../providers/ProviderUser';
import { useContextWebsocket } from '../../providers/ProviderWebsocket';

// local components
import Game from './components/Game';
import TablePlayers from './components/TablePlayers';
import Countdown from './components/Countdown';

// styles
import styles from './PageGame.module.scss';

const PageGame = () => {
  const [game, setGame] = useContextGame();
  const stateGameCurrent = useRef(game);
  const [user] = useContextUser();
  const { message, sendMessage } = useContextWebsocket();

  const { stateGame } = game;
  const { isOwnerLobby } = user;
  const { event, stateGame: stateGameReceived } = message;

  const isStateGameCountdown = stateGame === 'countdown';
  const isStateGameGame = stateGame === 'game';

  useEffect(() => {
    if (isStateGameGame && event === 'updateGame') {
      console.log('EVENT: updateGame');
      // stateGameCurrent.current = stateGameReceived;
    }
  }, [message]);

  const getHandlerCountdownEnd = () => {
    if (isOwnerLobby)
      return () => {
        sendMessage({ event: 'countdownEnd', game });
        setGame((prev) => ({ ...prev, stateGame: 'game' }));
      };

    return () => setGame((prev) => ({ ...prev, stateGame: 'game' }));
  };

  return (
    <main className={styles.pageGame}>
      <Game stateGame={stateGameCurrent} />
      <TablePlayers />
      {isStateGameCountdown && (
        <Countdown handleCountownEnd={getHandlerCountdownEnd()} />
      )}
    </main>
  );
};

export default PageGame;
