import PropTypes from 'prop-types';

// config
import { typesJetStandartized } from '../../../../config/jetTypesConfig';

// local components
import BtnDone from '../BtnDone/BtnDone';
import TitleSmall from '../TitleSmall/TitleSmall';
import ChartRadar from '../ChartRadar/ChartRadar';

// local hooks
import { useContextSettings } from '../../../../providers/ProviderSettings';

// styles
import styles from './StatsJet.module.scss';

const propTypes = {
  toggleIsOpen: PropTypes.func.isRequired,
};

const StatsJet = ({ toggleIsOpen }) => {
  const [{ typeJet }] = useContextSettings();

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperChart}>
        <TitleSmall>Type: {typeJet}</TitleSmall>
        <ChartRadar statsJet={typesJetStandartized[typeJet]} />
      </div>
      <BtnDone onClick={() => toggleIsOpen(false)} />
    </div>
  );
};

StatsJet.propTypes = propTypes;

export default StatsJet;
