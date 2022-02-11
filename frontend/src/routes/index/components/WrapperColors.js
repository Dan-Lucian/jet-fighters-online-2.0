import PropTypes from 'prop-types';

// assets
import ImgJet from '../../../assets/jet.png';

// local components
import TitleSmall from './TitleSmall';
import ColorPicker from './ColorPicker';
import BtnDone from './BtnDone';

// styles
import styles from './WrapperColors.module.scss';

const WrapperColors = ({ toggleIsOpen }) => (
  <div className={styles.wrapperColors}>
    <div className={styles.wrapperColorPicker}>
      <TitleSmall>Pick a color</TitleSmall>
      <ColorPicker />
      <BtnDone onClick={() => toggleIsOpen(false)} />
    </div>
    <div className={styles.jet}>
      <img className={styles.img} src={ImgJet} alt="jet" />
    </div>
  </div>
);
WrapperColors.propTypes = {
  toggleIsOpen: PropTypes.func,
};

export default WrapperColors;
