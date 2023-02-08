import { typesJetStandartized } from 'config/jetTypesConfig';
import DoneButton from 'routes/index/components/DoneButton/DoneButton';
import TitleSmall from 'routes/index/components/TitleSmall/TitleSmall';
import ChartRadar from 'routes/index/components/ChartRadar/ChartRadar';
import { useContextSettings } from 'providers/ProviderSettings';
import { FixMeLater } from 'types/FixMeLater';
import Styles from 'routes/index/components/JetStats/JetStats.module.scss';

interface IJetStatsProps {
  toggleIsOpen: (forceValue?: boolean) => void;
}

const JetStats = ({ toggleIsOpen }: IJetStatsProps) => {
  const [{ typeJet }]: FixMeLater = useContextSettings();

  return (
    <div className={Styles.wrapper}>
      <div className={Styles.wrapperChart}>
        <TitleSmall>Type: {typeJet}</TitleSmall>
        <ChartRadar statsJet={typesJetStandartized[typeJet]} />
      </div>
      <DoneButton onClick={() => toggleIsOpen(false)} />
    </div>
  );
};

export default JetStats;
