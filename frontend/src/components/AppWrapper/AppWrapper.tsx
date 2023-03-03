import { useContextTheme } from 'providers/ProviderTheme';
import Styles from 'components/AppWrapper/AppWrapper.module.scss';

const AppWrapper = (props: any) => {
  const { theme } = useContextTheme();

  return <div data-theme={theme} className={Styles.wrapper} {...props} />;
};

export default AppWrapper;
