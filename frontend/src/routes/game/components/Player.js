// styles
import styles from './Player.module.scss';

const Player = () => (
  <div className={styles.wrapper}>
    <div className={styles.ball} />
    <p className={styles.name}>Anon: 2</p>
    <p className={styles.jetType}>Jet type: Speedster</p>
    <div className={styles.wrapperColor}>
      <p className={styles.textColor}>Color:</p>
      <div className={styles.squareColor} />
    </div>
  </div>
);

export default Player;
