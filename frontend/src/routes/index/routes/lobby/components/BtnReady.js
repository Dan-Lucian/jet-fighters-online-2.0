// shared hooks
import { useContextWebsocket } from '../../../../../providers/ProviderWebsocket';
import { useContextLobby } from '../../../../../providers/ProviderLobby';
import { useContextUser } from '../../../../../providers/ProviderUser';

// styles
import styles from './BtnReady.module.scss';

const BtnReady = () => {
  const { sendMessage } = useContextWebsocket();
  const [lobby] = useContextLobby();
  const [user] = useContextUser();

  const { statusGame, isReadyPlayer1, isReadyPlayer2 } = lobby;
  const { isOwnerLobby } = user;

  const getHandlerClick = () => {
    if (isOwnerLobby && statusGame === 'lobby')
      return () => {
        sendMessage({
          event: 'updateLobby',
          lobby: {
            ...lobby,
            isReadyPlayer1: !isReadyPlayer1,
          },
        });
      };

    if (statusGame === 'lobby') {
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
        `updateLobby denial because needed statusGame: lobby but currently statusGame: ${statusGame}`
      );
  };

  return (
    <button onClick={getHandlerClick()} className={styles.btn} type="button">
      I'm ready
    </button>
  );
};

export default BtnReady;
