import PropTypes from 'prop-types';

import styles from './TogglerTheme.module.scss';

const TogglerTheme = ({ theme, getTogglerTheme }) => (
  <button
    onClick={getTogglerTheme()}
    className={styles.togglerTheme}
    type="button"
  >
    Change theme from {theme}
  </button>
);
TogglerTheme.propTypes = {
  theme: PropTypes.string,
  getTogglerTheme: PropTypes.func,
};

export default TogglerTheme;
