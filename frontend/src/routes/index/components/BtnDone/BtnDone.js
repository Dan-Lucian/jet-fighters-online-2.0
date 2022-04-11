import PropTypes from 'prop-types';

// styles
import styles from './BtnDone.module.scss';

const BtnDone = ({ onClick }) => (
  <button onClick={onClick} className={styles.btnDone} type="button">
    Done
  </button>
);
BtnDone.propTypes = {
  onClick: PropTypes.func,
};

export default BtnDone;
