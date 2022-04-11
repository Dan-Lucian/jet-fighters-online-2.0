import PropTypes from 'prop-types';

// styles
import styles from './ArrowLeft.module.scss';

const ArrowLeft = ({ onClick }) => (
  <button onClick={onClick} className={styles.arrowLeft} type="button">
    ←
  </button>
);
ArrowLeft.propTypes = {
  onClick: PropTypes.func,
};

export default ArrowLeft;
