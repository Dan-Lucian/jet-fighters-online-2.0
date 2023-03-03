import { standartizedJetTypesConfig } from 'config/jetTypesConfig';
import DoneButton from 'routes/index/components/DoneButton/DoneButton';
import SmallTitle from 'routes/index/components/SmallTitle/SmallTitle';
import RadarChart from 'routes/index/components/RadarChart/RadarChart';
import { useContextSettings } from 'providers/ProviderSettings';
import { FixMeLater } from 'types/FixMeLater';
import { hasObjectKey } from 'utils/generalTypeUtils';
import Styles from 'routes/index/components/JetStats/JetStats.module.scss';

interface IJetStatsProps {
  toggleIsOpen: (forceValue?: boolean) => void;
}

const JetStats = ({ toggleIsOpen }: IJetStatsProps) => {
  const [{ type }]: FixMeLater = useContextSettings();

  if (!hasObjectKey(standartizedJetTypesConfig, type)) {
    return <div></div>;
  }

  return (
    <div className={Styles.mainWrapper}>
      <div className={Styles.chartWrapper}>
        <SmallTitle>Type: {type}</SmallTitle>
        <RadarChart standartizedJetStats={standartizedJetTypesConfig[type]} />
      </div>
      <DoneButton onClick={() => toggleIsOpen(false)} />
    </div>
  );
};

export default JetStats;
