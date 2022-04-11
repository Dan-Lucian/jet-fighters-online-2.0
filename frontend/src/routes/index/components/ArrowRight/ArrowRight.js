import PropTypes from 'prop-types';

// styles
import styles from './ArrowRight.module.scss';

const propTypes = {
  onClick: PropTypes.func.isRequired,
};

const ArrowRight = ({ onClick }) => (
  <button onClick={onClick} className={styles.arrowRight} type="button">
    →
  </button>
);

ArrowRight.propTypes = propTypes;

export default ArrowRight;
