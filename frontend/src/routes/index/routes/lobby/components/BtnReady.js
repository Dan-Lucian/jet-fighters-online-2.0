// shared hooks
import { useContextGame } from '../../../../../providers/ProviderGame';
import { useContextUser } from '../../../../../providers/ProviderUser';
import { useContextLobby } from '../../../../../providers/ProviderLobby';
import { useContextWebsocket } from '../../../../../providers/ProviderWebsocket';

// styles
import styles from './BtnReady.module.scss';

const BtnReady = () => {
  const [game] = useContextGame();
  const [user] = useContextUser();
  const [lobby] = useContextLobby();
  const { sendMessage } = useContextWebsocket();

  const { statusGame } = game;
  const { isOwnerLobby } = user;
  const { isReadyPlayer1, isReadyPlayer2 } = lobby;

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
        `updateLobby denial because needed statusGame=lobby but currently statusGame=${statusGame}`
      );
  };

  return (
    <button onClick={getHandlerClick()} className={styles.btn} type="button">
      I'm ready
    </button>
  );
};

export default BtnReady;
