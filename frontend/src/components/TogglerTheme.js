// shared hooks
import { useContextTheme } from '../providers/ProviderTheme';

// styles
import styles from './TogglerTheme.module.scss';

const TogglerTheme = () => {
  const { theme, getTogglerTheme } = useContextTheme();

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
        onChange={() => {}}
      />
    </label>
  );
};

export default TogglerTheme;
