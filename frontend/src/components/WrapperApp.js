// shared hooks
import { useContextTheme } from '../providers/ProviderTheme';

// styles
import styles from './WrapperApp.module.scss';

const WrapperApp = (props) => {
  const { theme } = useContextTheme();

  return <div data-theme={theme} className={styles.wrapperApp} {...props} />;
};

export default WrapperApp;
