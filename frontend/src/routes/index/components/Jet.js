import PropTypes from 'prop-types';

// styles
import styles from './Jet.module.scss';

const Jet = ({ onClick, imgJet }) => (
  <button onClick={onClick} className={styles.jet} type="button">
    <img src={imgJet} alt="jet" />
  </button>
);
Jet.propTypes = {
  onClick: PropTypes.func.isRequired,
  imgJet: PropTypes.string.isRequired,
};

export default Jet;
