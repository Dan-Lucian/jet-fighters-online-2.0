// local components
import TitleSmall from './TitleSmall';
import Polygon from './Polygon';

// local hooks
import { useContextSettings } from '../../../providers/ProviderSettings';

// styles
import styles from './WrapperStats.module.scss';

const WrapperStats = () => {
  const [settings] = useContextSettings();

  return (
    <div className={styles.wrapperStats}>
      <TitleSmall>Type: {settings.typeJet}</TitleSmall>
      <Polygon />
    </div>
  );
};

export default WrapperStats;
