import PropTypes from 'prop-types';

// styles
import styles from './Jet.module.scss';

const propTypes = {
  onClick: PropTypes.func.isRequired,
  imgJet: PropTypes.string.isRequired,
};

const Jet = ({ onClick, imgJet }) => (
  <button onClick={onClick} className={styles.jet} type="button">
    <img width="48px" height="48px" src={imgJet} alt="jet" />
  </button>
);

Jet.propTypes = propTypes;

export default Jet;
