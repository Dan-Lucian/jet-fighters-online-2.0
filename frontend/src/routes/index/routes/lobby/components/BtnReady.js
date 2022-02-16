// shared hooks
import { useContextWebsocket } from '../../../../../providers/ProviderWebsocket';
import { useContextGame } from '../../../../../providers/ProviderGame';
import { useContextUser } from '../../../../../providers/ProviderUser';

// styles
import styles from './BtnReady.module.scss';

const BtnReady = () => {
  const { sendMessage } = useContextWebsocket();
  const [game] = useContextGame();
  const [user] = useContextUser();

  const { statusGame, isReadyPlayer1, isReadyPlayer2 } = game;
  const { isOwnerLobby } = user;

  const handleClick = () => {
    if (statusGame === 'lobby') {
      if (isOwnerLobby) {
        sendMessage({
          event: 'updateLobby',
          game: {
            ...game,
            isReadyPlayer1: !isReadyPlayer1,
          },
        });
        return;
      }

      sendMessage({
        event: 'updateLobby',
        game: {
          ...game,
          isReadyPlayer2: !isReadyPlayer2,
        },
      });
    }
  };

  return (
    <button onClick={handleClick} className={styles.btn} type="button">
      I'm ready
    </button>
  );
};

export default BtnReady;
