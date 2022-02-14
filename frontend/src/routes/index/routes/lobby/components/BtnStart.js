import PropTypes from 'prop-types';

// styles
import styles from './BtnStart.module.scss';

const BtnStart = ({ onClick }) => (
  <button onClick={onClick} className={styles.btn} type="button">
    START
  </button>
);
BtnStart.propTypes = {
  onClick: PropTypes.func,
};

export default BtnStart;
