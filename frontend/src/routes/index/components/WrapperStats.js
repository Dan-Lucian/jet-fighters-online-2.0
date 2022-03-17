// config
import { typesJetStandartized } from '../../../config/typesJet';

// local components
import TitleSmall from './TitleSmall';
import ChartRadar from './ChartRadar';

// local hooks
import { useContextSettings } from '../../../providers/ProviderSettings';

// styles
import styles from './WrapperStats.module.scss';

const WrapperStats = () => {
  const [settings] = useContextSettings();

  return (
    <div className={styles.wrapperStats}>
      <TitleSmall>Type: {settings.typeJet}</TitleSmall>
      <ChartRadar statsJet={typesJetStandartized[settings.typeJet]} />
    </div>
  );
};

export default WrapperStats;
