// shared hooks
import { useContextGlobal } from '../../../../../providers/ProviderGlobal';

// styles
import styles from './StatusCreate.module.scss';

const StatusCreate = () => {
  const [game] = useContextGlobal();

  const { stateGame } = game;

  if (stateGame === 'lobby') {
    return (
      <div className={`${styles.statusCreate} ${styles.textGreen}`}>
        Already in a lobby
      </div>
    );
  }

  return <div className={styles.statusCreate}>You are not in a lobby</div>;
};

export default StatusCreate;
