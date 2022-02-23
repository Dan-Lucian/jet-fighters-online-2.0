import { useEffect } from 'react';
import PropTypes from 'prop-types';

// styles
import styles from './GameOver.module.scss';

const GameOver = ({ winner, isOwnerLobby, handleGameOverEnd }) => {
  console.log(winner, isOwnerLobby, handleGameOverEnd);
  useEffect(() => {
    const idInterval = setTimeout(() => {
      handleGameOverEnd();
    }, 3000);

    return () => {
      clearInterval(idInterval);
      handleGameOverEnd();
    };
  }, [handleGameOverEnd]);

  let text = winner === 'joiner' ? 'You Win' : 'You Lose';
  if (isOwnerLobby) {
    text = winner === 'owner' ? 'You Win' : 'You Lose';
  }
  if (winner === 'draw') {
    text = `It's a draw`;
  }

  return <div className={styles.wrapper}>{text}</div>;
};
GameOver.propTypes = {
  winner: PropTypes.string,
  isOwnerLobby: PropTypes.bool,
  handleGameOverEnd: PropTypes.func,
};

export default GameOver;
