// styles
import styles from './Loader.module.scss';

const Loader = (props) => (
  <div className={styles.wrapper} {...props}>
    <div className={styles.loader}>Loading...</div>
  </div>
);

export default Loader;
