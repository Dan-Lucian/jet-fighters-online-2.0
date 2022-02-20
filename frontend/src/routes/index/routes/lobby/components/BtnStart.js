// // shared hooks
import { useContextGame } from '../../../../../providers/ProviderGame';
import { useContextLobby } from '../../../../../providers/ProviderLobby';

// styles
import styles from './BtnStart.module.scss';

const BtnStart = () => {
  const [game] = useContextGame();
  const [lobby] = useContextLobby();

  const { stateGame } = game;
  const { isReadyPlayer1, isReadyPlayer2 } = lobby;

  const isStateGameLobby = stateGame === 'lobby';
  const arePlayersReady = isReadyPlayer1 && isReadyPlayer2;

  return (
    <input
      disabled={!isStateGameLobby || !arePlayersReady}
      className={styles.btn}
      type="submit"
      value="START"
      form="form-settings-game"
    />
  );
};
export default BtnStart;
