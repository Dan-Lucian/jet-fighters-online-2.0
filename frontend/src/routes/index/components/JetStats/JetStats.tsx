import { standartizedJetTypesConfig } from 'config/jetTypesConfig';
import DoneButton from 'routes/index/components/DoneButton/DoneButton';
import TitleSmall from 'routes/index/components/TitleSmall/TitleSmall';
import RadarChart from 'routes/index/components/RadarChart/RadarChart';
import { useContextSettings } from 'providers/ProviderSettings';
import { FixMeLater } from 'types/FixMeLater';
import Styles from 'routes/index/components/JetStats/JetStats.module.scss';
import { hasObjectKey } from 'utils/GeneralTypeUtils';

interface IJetStatsProps {
  toggleIsOpen: (forceValue?: boolean) => void;
}

const JetStats = ({ toggleIsOpen }: IJetStatsProps) => {
  const [{ type }]: FixMeLater = useContextSettings();

  if (!hasObjectKey(standartizedJetTypesConfig, type)) {
    return <div></div>;
  }

  return (
    <div className={Styles.wrapper}>
      <div className={Styles.wrapperChart}>
        <TitleSmall>Type: {type}</TitleSmall>
        <RadarChart standartizedJetStats={standartizedJetTypesConfig[type]} />
      </div>
      <DoneButton onClick={() => toggleIsOpen(false)} />
    </div>
  );
};

export default JetStats;
