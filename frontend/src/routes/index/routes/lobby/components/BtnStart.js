// shared hooks
import { useContextGame } from '../../../../../providers/ProviderGame';

// styles
import styles from './BtnStart.module.scss';

const BtnStart = () => {
  const [game] = useContextGame();

  const { statusGame } = game;

  const getHandlerClick = () => {
    if (statusGame === 'lobby') {
      return () => console.log('Start game');
    }

    return () =>
      console.log(
        `updateLobby denial because needed statusGame: lobby but currently statusGame: ${statusGame}`
      );
  };

  return (
    <button onClick={getHandlerClick()} className={styles.btn} type="button">
      START
    </button>
  );
};

export default BtnStart;
