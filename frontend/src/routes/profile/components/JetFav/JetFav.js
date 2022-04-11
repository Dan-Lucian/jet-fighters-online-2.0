import PropTypes from 'prop-types';

// config
import { typesJet } from '../../../../config/typesJet';

// shared components
import Jet from '../../../../components/Jet/Jet';

// styles
import styles from './JetFav.module.scss';

const propTypes = {
  typeJet: PropTypes.string.isRequired,
  wins: PropTypes.number.isRequired,
  loses: PropTypes.number.isRequired,
  draws: PropTypes.number.isRequired,
};

const JetFav = ({ typeJet, wins, loses, draws }) => {
  const total = wins + loses + draws;

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperJet}>
        <Jet onClick={() => {}} imgJet={typesJet[typeJet].imgJet} />
        <div className={styles.wrapperTypeJet}>
          <p>{capitalize(typeJet)}</p>
          <p className={styles.games}>{total} games</p>
        </div>
      </div>
      <div className={styles.stats}>
        <p className={styles.wins}>{wins}W</p>
        <p className={styles.loses}>{loses}L</p>
        <p className={styles.draws}>{draws}D</p>
      </div>
    </div>
  );
};

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

JetFav.propTypes = propTypes;

export default JetFav;
