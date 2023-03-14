import { useNavigate } from 'react-router-dom';

// shared hooks
import { useContextGlobal } from '../../../../providers/ProviderGlobal';
import { useContextLobby } from '../../../../providers/ProviderLobby';
import { useContextWebsocket } from '../../../../providers/ProviderWebsocket';

// local components
import Countdown from '../Countdown/Countdown';
import GameOver from '../GameOver/GameOver';

// styles
import styles from './Overlay.module.scss';

const Overlay = () => {
  const [{ stateApp, isOwnerLobby, winner }, setGlobal] = useContextGlobal();
  const [{ idLobby }] = useContextLobby();
  const { sendMessage } = useContextWebsocket();
  const navigate = useNavigate();

  const isStateAppCountdown = stateApp === 'countdown';
  const isStateAppGameOver = stateApp === 'gameOver';

  const handleCountdownEnd = () => {
    if (isOwnerLobby) {
      sendMessage({ event: 'countdownEnd', idLobby });
      setGlobal((prev) => ({ ...prev, stateApp: 'game' }));
      return;
    }

    setGlobal((prev) => ({ ...prev, stateApp: 'game' }));
  };

  const handleGameOverEnd = () => {
    setGlobal((prev) => ({ ...prev, stateApp: 'lobby' }));
    navigate('/lobby');
  };

  return (
    <div className={styles.wrapper}>
      {isStateAppCountdown && (
        <Countdown handleCountownEnd={handleCountdownEnd} />
      )}
      {isStateAppGameOver && (
        <GameOver
          winner={winner}
          isOwnerLobby={isOwnerLobby}
          handleGameOverEnd={handleGameOverEnd}
        />
      )}
    </div>
  );
};

export default Overlay;
