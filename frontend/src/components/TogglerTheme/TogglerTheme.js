// shared hooks
import { useContextTheme } from '../../providers/ProviderTheme';

// styles
import styles from './TogglerTheme.module.scss';

// assets
import iconMoon from '../../assets/images/moon.svg';
import iconSun from '../../assets/images/sun.svg';

const TogglerTheme = () => {
  const { theme, getTogglerTheme } = useContextTheme();

  const isThemeDark = theme === 'dark';

  return (
    <label
      className={`${styles.btnToggle} ${isThemeDark && styles.btnToggleOn}`}
      aria-label="Toggle"
    >
      <input
        className={styles.inputToggle}
        type="checkbox"
        checked={isThemeDark}
        onClick={getTogglerTheme()}
        onChange={() => {}}
      />
      <div className={styles.wrapperIcons}>
        <img
          width="25px"
          height="25px"
          className={styles.iconMoon}
          src={iconMoon}
          alt="moon"
        />
        <img
          width="25px"
          height="25px"
          className={styles.iconSun}
          src={iconSun}
          alt="sun"
        />
      </div>
    </label>
  );
};

export default TogglerTheme;
