// shared hooks
import { useContextGlobal } from '../../../../../../providers/ProviderGlobal';
import { useContextLobby } from '../../../../../../providers/ProviderLobby';

// styles
import styles from './BtnStart.module.scss';

const BtnStart = () => {
  const [{ stateApp }] = useContextGlobal();
  const [{ isReadyOwner, isReadyJoiner }] = useContextLobby();

  const isStateAppLobby = stateApp === 'lobby';
  const arePlayersReady = isReadyOwner && isReadyJoiner;

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
