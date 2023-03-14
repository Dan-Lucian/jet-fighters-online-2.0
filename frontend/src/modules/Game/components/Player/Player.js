import PropTypes from 'prop-types';

// styles
import styles from './Player.module.scss';

const propTypes = {
  player: PropTypes.object.isRequired,
};

const Player = ({ player }) => {
  const { name, score, typeJet } = player;

  return (
    <div className={styles.wrapper}>
      <div className={styles.ball} />
      <p className={styles.name}>
        {name}: {score}
      </p>
      <p className={styles.jetType}>Jet type: {typeJet}</p>
      <div className={styles.wrapperColor}>
        <p className={styles.textColor}>Color:</p>
        <div
          style={{ backgroundColor: player.color }}
          className={styles.squareColor}
        />
      </div>
    </div>
  );
};

Player.propTypes = propTypes;

export default Player;
