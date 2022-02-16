// shared hooks
import { useContextGame } from '../../../../../providers/ProviderGame';

// styles
import styles from './BtnStart.module.scss';

const BtnStart = () => {
  const [game] = useContextGame();

  const { statusGame } = game;

  const handleClick = () => {
    if (statusGame === 'lobby') {
      console.log('Start game');
    }
  };

  return (
    <button onClick={handleClick} className={styles.btn} type="button">
      START
    </button>
  );
};

export default BtnStart;
