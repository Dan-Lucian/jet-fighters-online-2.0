// shared hooks
import { useContextWebsocket } from '../../../../../providers/ProviderWebsocket';
import { useContextGame } from '../../../../../providers/ProviderGame';
import { useContextUser } from '../../../../../providers/ProviderUser';

// styles
import styles from './BtnQuit.module.scss';

const BtnQuit = () => {
  const { sendMessage } = useContextWebsocket();
  const [game] = useContextGame();
  const [user] = useContextUser();

  const { statusGame, idLobby } = game;
  const { isOwnerLobby } = user;

  const handleClick = () => {
    if (statusGame === 'lobby') {
      sendMessage({
        event: 'quitLobby',
        idLobby,
        isOwnerLobby,
      });
    }
  };

  return (
    <button onClick={handleClick} className={styles.btn} type="button">
      Quit lobby
    </button>
  );
};

export default BtnQuit;
