// local components
import WrapperStats from './WrapperStats';
import WrapperColors from './WrapperColors';
import BtnDone from './BtnDone';

import styles from './Preview.module.scss';

const Preview = () => (
  <div className={styles.preview}>
    <WrapperStats />
    <WrapperColors />
    <BtnDone />
  </div>
);

export default Preview;
