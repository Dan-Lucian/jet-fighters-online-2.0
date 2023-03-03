import { useContextTheme } from 'providers/ProviderTheme';
import moonIconSrc from 'assets/images/moon.svg';
import sunIconSrc from 'assets/images/sun.svg';
import { FixMeLater } from 'types/FixMeLater';
import Styles from 'components/ThemeToggler/ThemeToggler.module.scss';

const ThemeToggler = () => {
  const { theme, getTogglerTheme }: FixMeLater = useContextTheme();
  const isThemeDark = theme === 'dark';

  return (
    <label className={`${Styles.toggleButton} ${isThemeDark && Styles.activeToggleButton}`} aria-label="Toggle">
      <input
        className={Styles.input}
        type="checkbox"
        checked={isThemeDark}
        onClick={getTogglerTheme()}
        onChange={() => {}}
      />
      <div className={Styles.iconsWrapper}>
        <img width="25px" height="25px" className={Styles.moonIcon} src={moonIconSrc} alt="moon" />
        <img width="25px" height="25px" className={Styles.sunIcon} src={sunIconSrc} alt="sun" />
      </div>
    </label>
  );
};

export default ThemeToggler;
