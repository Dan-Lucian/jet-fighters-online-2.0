// shared hooks
import { useContextGlobal } from '../../../providers/ProviderGlobal';
import { useContextLobby } from '../../../providers/ProviderLobby';
import { useContextWebsocket } from '../../../providers/ProviderWebsocket';

// local components
import Countdown from './Countdown';

// styles
import styles from './Overlay.module.scss';

const Overlay = () => {
  const [global, setGlobal] = useContextGlobal();
  const [lobby] = useContextLobby();
  const { sendMessage } = useContextWebsocket();

  const { stateApp, isOwnerLobby } = global;
  const { idLobby } = lobby;

  const isStateAppCountdown = stateApp === 'countdown';

  const handleCountdownEnd = () => {
    if (isOwnerLobby) {
      sendMessage({ event: 'countdownEnd', idLobby });
      setGlobal((prev) => ({ ...prev, stateApp: 'game' }));
      return;
    }

    setGlobal((prev) => ({ ...prev, stateApp: 'game' }));
  };

  return (
    <div className={styles.wrapper}>
      {isStateAppCountdown && (
        <Countdown handleCountownEnd={handleCountdownEnd} />
      )}
    </div>
  );
};

export default Overlay;
