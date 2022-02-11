// local components
import TitleSmall from './TitleSmall';
import Polygon from './Polygon';

// local hooks
import { useJet } from './ProviderJet';

// styles
import styles from './WrapperStats.module.scss';

const WrapperStats = () => {
  const [jet] = useJet();

  return (
    <div className={styles.wrapperStats}>
      <TitleSmall>Type: {jet.type}</TitleSmall>
      <Polygon />
    </div>
  );
};

export default WrapperStats;
