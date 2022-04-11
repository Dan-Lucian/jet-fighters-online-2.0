import PropTypes from 'prop-types';

// styles
import styles from './BtnDone.module.scss';

const propTypes = {
  onClick: PropTypes.func,
};

const BtnDone = ({ onClick }) => (
  <button onClick={onClick} className={styles.btnDone} type="button">
    Done
  </button>
);

BtnDone.propTypes = propTypes;

export default BtnDone;
