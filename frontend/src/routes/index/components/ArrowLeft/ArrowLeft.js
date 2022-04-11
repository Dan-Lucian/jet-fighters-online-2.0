import PropTypes from 'prop-types';

// styles
import styles from './ArrowLeft.module.scss';

const propTypes = {
  onClick: PropTypes.func.isRequired,
};

const ArrowLeft = ({ onClick }) => (
  <button onClick={onClick} className={styles.arrowLeft} type="button">
    ←
  </button>
);

ArrowLeft.propTypes = propTypes;

export default ArrowLeft;
