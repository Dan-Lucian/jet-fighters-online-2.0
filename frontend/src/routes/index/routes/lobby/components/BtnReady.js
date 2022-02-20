// shared hooks
import { useContextGlobal } from '../../../../../providers/ProviderGlobal';
import { useContextLobby } from '../../../../../providers/ProviderLobby';
import { useContextWebsocket } from '../../../../../providers/ProviderWebsocket';

// styles
import styles from './BtnReady.module.scss';

const BtnReady = () => {
  const [global] = useContextGlobal();
  const [lobby] = useContextLobby();
  const { sendMessage } = useContextWebsocket();

  const { stateApp, isOwnerLobby } = global;
  const { isReadyPlayer1, isReadyPlayer2 } = lobby;

  const isStateAppLobby = stateApp === 'lobby';

  const getHandlerClick = () => {
    if (isOwnerLobby && isStateAppLobby)
      return () => {
        sendMessage({
          event: 'updateLobby',
          lobby: {
            ...lobby,
            isReadyPlayer1: !isReadyPlayer1,
          },
        });
      };

    if (isStateAppLobby) {
      return () =>
        sendMessage({
          event: 'updateLobby',
          lobby: {
            ...lobby,
            isReadyPlayer2: !isReadyPlayer2,
          },
        });
    }

    return () =>
      console.log(
        `updateLobby denial because needed stateApp=lobby but currently stateApp=${stateApp}`
      );
  };

  return (
    <button
      disabled={!isStateAppLobby}
      onClick={getHandlerClick()}
      className={styles.btn}
      type="button"
    >
      I'm ready
    </button>
  );
};

export default BtnReady;
