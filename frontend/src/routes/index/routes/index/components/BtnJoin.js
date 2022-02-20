// shared hooks
import { useContextGlobal } from '../../../../../providers/ProviderGlobal';

// styles
import styles from './BtnJoin.module.scss';

const BtnJoin = () => {
  const [game] = useContextGlobal();

  const { stateGame } = game;

  const isstateGamePreLobby = stateGame === 'preLobby';

  return (
    <input
      disabled={!isstateGamePreLobby}
      className={styles.btnJoin}
      type="submit"
      value="Join a lobby"
      form="form-id"
    />
  );
};

export default BtnJoin;
