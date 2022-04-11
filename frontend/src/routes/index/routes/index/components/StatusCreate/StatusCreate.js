// shared hooks
import { useContextGlobal } from '../../../../../../providers/ProviderGlobal';

// styles
import styles from './StatusCreate.module.scss';

const StatusCreate = () => {
  const [game] = useContextGlobal();

  const { stateApp } = game;

  const isStateAppLobby = stateApp === 'lobby';

  if (isStateAppLobby) {
    return (
      <div className={`${styles.statusCreate} ${styles.textGreen}`}>
        Already in a lobby
      </div>
    );
  }

  return <div className={styles.statusCreate}>You are not in a lobby</div>;
};

export default StatusCreate;
