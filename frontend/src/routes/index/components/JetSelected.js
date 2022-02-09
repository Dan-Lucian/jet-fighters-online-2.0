import ImgJet from '../../../assets/jet.png';
import styles from './JetSelected.module.scss';

const JetSelected = () => (
  <div className={styles.wrapper}>
    <h3>Selected Jet</h3>
    <button className={styles.btn} type="button">
      <img src={ImgJet} alt="jet" />
    </button>
  </div>
);

export default JetSelected;
