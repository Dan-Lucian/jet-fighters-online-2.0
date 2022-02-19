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

  const { stateGame } = game;
  const { isOwnerLobby } = user;
  const { isReadyPlayer1, isReadyPlayer2 } = lobby;

  const isStateGameLobby = stateGame === 'lobby';

  const getHandlerClick = () => {
    if (isOwnerLobby && isStateGameLobby)
      return () => {
        sendMessage({
          event: 'updateLobby',
          lobby: {
            ...lobby,
            isReadyPlayer1: !isReadyPlayer1,
          },
        });
      };

    if (isStateGameLobby) {
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
        `updateLobby denial because needed stateGame=lobby but currently stateGame=${stateGame}`
      );
  };

  return (
    <button
      disabled={!isStateGameLobby}
      onClick={getHandlerClick()}
      className={styles.btn}
      type="button"
    >
      I'm ready
    </button>
  );
};

export default BtnReady;
