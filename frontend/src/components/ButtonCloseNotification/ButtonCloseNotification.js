import PropTypes from 'prop-types';

// styles
import styles from './ButtonCloseNotification.module.scss';

const propTypes = {
  onClick: PropTypes.func.isRequired,
};

const ButtonCloseNotification = ({ onClick }) => (
  <button onClick={onClick} className={styles.button} type="button">
    Close
  </button>
);

ButtonCloseNotification.propTypes = propTypes;

export default ButtonCloseNotification;
