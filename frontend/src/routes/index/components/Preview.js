// local components
import WrapperStats from './WrapperStats';
import WrapperColors from './WrapperColors';

import styles from './Preview.module.scss';

const Preview = () => (
  <div className={styles.preview}>
    <WrapperStats />
    <WrapperColors />
  </div>
);

export default Preview;
