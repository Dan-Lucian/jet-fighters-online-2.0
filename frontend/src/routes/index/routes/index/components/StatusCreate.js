// shared hooks
import { useContextLobby } from '../../../../../providers/ProviderLobby';

// styles
import styles from './StatusCreate.module.scss';

const StatusCreate = () => {
  const [lobby] = useContextLobby();

  const { statusGame } = lobby;

  if (statusGame === 'lobby') {
    return (
      <div className={`${styles.statusCreate} ${styles.textGreen}`}>
        Already in a lobby
      </div>
    );
  }

  return <div className={styles.statusCreate}>You are not in a lobby</div>;
};

export default StatusCreate;
