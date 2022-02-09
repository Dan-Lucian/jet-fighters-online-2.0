// local compoenents
import Carousel from './Carousel';
import Preview from './Preview';

import styles from './SelectJet.module.scss';

const SelectJet = () => (
  <aside className={styles.selectJet}>
    <Carousel />
    <Preview />
  </aside>
);

export default SelectJet;
