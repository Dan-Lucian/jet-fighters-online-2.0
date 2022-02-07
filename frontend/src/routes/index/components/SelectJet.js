import styles from './SelectJet.module.scss';
import ImgJet from '../../../assets/jet.png';

const SelectJet = () => (
  <div className={styles.wrapper}>
    <h3>Selected Jet</h3>
    <button className={styles.btn} type="button">
      <img src={ImgJet} alt="jet" />
    </button>
  </div>
);

export default SelectJet;
