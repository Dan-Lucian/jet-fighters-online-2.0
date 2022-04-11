// shared hooks
import { useContextGlobal } from '../../../../../../providers/ProviderGlobal';
import { useContextLobby } from '../../../../../../providers/ProviderLobby';
import { useContextWebsocket } from '../../../../../../providers/ProviderWebsocket';

// styles
import styles from './BtnReady.module.scss';

const BtnReady = () => {
  const [global] = useContextGlobal();
  const [lobby] = useContextLobby();
  const { sendMessage } = useContextWebsocket();

  const { stateApp, isOwnerLobby } = global;
  const { isReadyOwner, isReadyJoiner } = lobby;

  const isStateAppLobby = stateApp === 'lobby';

  const getHandlerClick = () => {
    if (isOwnerLobby && isStateAppLobby)
      return () => {
        sendMessage({
          event: 'updateLobby',
          lobby: {
            ...lobby,
            isReadyOwner: !isReadyOwner,
          },
        });
      };

    if (isStateAppLobby) {
      return () =>
        sendMessage({
          event: 'updateLobby',
          lobby: {
            ...lobby,
            isReadyJoiner: !isReadyJoiner,
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
