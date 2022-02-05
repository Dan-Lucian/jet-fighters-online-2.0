import PropTypes from 'prop-types';

import styles from './TogglerTheme.module.scss';

const TogglerTheme = ({ theme, getTogglerTheme }) => {
  const on = theme === 'dark';

  return (
    <label
      className={`${styles.btnToggle} ${on && styles.btnToggleOn}`}
      aria-label="Toggle"
    >
      <input
        className={styles.inputToggle}
        type="checkbox"
        checked={on}
        onClick={getTogglerTheme()}
      />
    </label>
  );
};
TogglerTheme.propTypes = {
  theme: PropTypes.string,
  getTogglerTheme: PropTypes.func,
};

export default TogglerTheme;
