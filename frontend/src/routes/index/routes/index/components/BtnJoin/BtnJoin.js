// shared hooks
import { useContextGlobal } from '../../../../../../providers/ProviderGlobal';

// styles
import styles from './BtnJoin.module.scss';

const BtnJoin = () => {
  const [global] = useContextGlobal();

  const { stateApp } = global;

  const isStateAppPreLobby = stateApp === 'preLobby';

  return (
    <input
      disabled={!isStateAppPreLobby}
      className={styles.btnJoin}
      type="submit"
      value="Join a lobby"
      form="form-id"
    />
  );
};

export default BtnJoin;
