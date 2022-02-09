// local components
import TitleSmall from './TitleSmall';
import ColorPicker from './ColorPicker';

import ImgJet from '../../../assets/jet.png';

import styles from './WrapperColors.module.scss';

const WrapperColors = () => (
  <div className={styles.wrapperColors}>
    <div className={styles.wrapperColorPicker}>
      <TitleSmall>Pick a color</TitleSmall>
      <ColorPicker />
    </div>
    <div className={styles.jet}>
      <img className={styles.img} src={ImgJet} alt="jet" />
    </div>
  </div>
);

export default WrapperColors;
