import PropTypes from 'prop-types';

// styles
import styles from './BtnReady.module.scss';

const BtnReady = ({ onClick }) => (
  <button onClick={onClick} className={styles.btn} type="button">
    I'm ready
  </button>
);
BtnReady.propTypes = {
  onClick: PropTypes.func,
};

export default BtnReady;
