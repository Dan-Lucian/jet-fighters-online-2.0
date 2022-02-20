// // shared hooks
import { useContextGlobal } from '../../../../../providers/ProviderGlobal';
import { useContextLobby } from '../../../../../providers/ProviderLobby';

// styles
import styles from './BtnStart.module.scss';

const BtnStart = () => {
  const [global] = useContextGlobal();
  const [lobby] = useContextLobby();

  const { stateApp } = global;
  const { isReadyPlayer1, isReadyPlayer2 } = lobby;

  const isStateAppLobby = stateApp === 'lobby';
  const arePlayersReady = isReadyPlayer1 && isReadyPlayer2;

  return (
    <input
      disabled={!isStateAppLobby || !arePlayersReady}
      className={styles.btn}
      type="submit"
      value="START"
      form="form-settings-game"
    />
  );
};
export default BtnStart;
