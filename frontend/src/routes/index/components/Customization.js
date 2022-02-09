// local components
import Title from './Title';
import Settings from './Settings';
import JetSelected from './JetSelected';

import styles from './Customization.module.scss';

const Customization = () => (
  <div className={styles.customization}>
    <div className={styles.wrapperOuter}>
      <Title>Customize your game</Title>
      <div className={styles.wrapperInner}>
        <Settings />
        <JetSelected />
      </div>
    </div>
  </div>
);

export default Customization;
