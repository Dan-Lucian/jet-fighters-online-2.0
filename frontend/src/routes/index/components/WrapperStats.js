// local components
import TitleSmall from './TitleSmall';
import Polygon from './Polygon';

import styles from './WrapperStats.module.scss';

const WrapperStats = () => (
  <div className={styles.wrapperStats}>
    <TitleSmall>Type: Speedster</TitleSmall>
    <Polygon />
  </div>
);

export default WrapperStats;
