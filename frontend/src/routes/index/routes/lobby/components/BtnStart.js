// shared hooks
import { useContextWebsocket } from '../../../../../providers/ProviderWebsocket';
import { useContextGame } from '../../../../../providers/ProviderGame';
import { useContextUser } from '../../../../../providers/ProviderUser';
import { useContextSettings } from '../../../../../providers/ProviderSettings';

// styles
import styles from './BtnStart.module.scss';

const BtnStart = () => {
  const { sendMessage } = useContextWebsocket();
  const [game] = useContextGame();
  const [user] = useContextUser();
  const [settings] = useContextSettings();

  const { statusGame, idLobby, isReadyPlayer1, isReadyPlayer2 } = game;
  const { isOwnerLobby } = user;

  const getHandlerClick = () => {
    // the start btn will work only if both players are shown to be ready
    if (isReadyPlayer1 && isReadyPlayer2 && statusGame === 'lobby') {
      return () =>
        sendMessage({ event: 'start', isOwnerLobby, idLobby, settings });
    }

    if ((!isReadyPlayer1 || !isReadyPlayer2) && statusGame === 'lobby') {
      return () =>
        console.log(`start denial because one of the players is not ready`);
    }

    return () =>
      console.log(
        `start denial because needed statusGame=lobby but currently statusGame=${statusGame}`
      );
  };

  return (
    <button onClick={getHandlerClick()} className={styles.btn} type="button">
      START
    </button>
  );
};

export default BtnStart;
