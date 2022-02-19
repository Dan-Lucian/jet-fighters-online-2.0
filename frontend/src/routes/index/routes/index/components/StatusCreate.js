// shared hooks
import { useContextGame } from '../../../../../providers/ProviderGame';

// styles
import styles from './StatusCreate.module.scss';

const StatusCreate = () => {
  const [game] = useContextGame();

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
