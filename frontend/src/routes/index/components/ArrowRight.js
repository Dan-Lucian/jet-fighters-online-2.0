import PropTypes from 'prop-types';

// styles
import styles from './ArrowRight.module.scss';

const ArrowRight = ({ onClick }) => (
  <button onClick={onClick} className={styles.arrowRight} type="button">
    →
  </button>
);
ArrowRight.propTypes = {
  onClick: PropTypes.func,
};

export default ArrowRight;
