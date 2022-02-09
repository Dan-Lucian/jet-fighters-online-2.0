import ImgJet from '../../../assets/jet.png';
import styles from './Jet.module.scss';

const Jet = () => (
  <button className={styles.jet} type="button">
    <img src={ImgJet} alt="jet" />
  </button>
);

export default Jet;
