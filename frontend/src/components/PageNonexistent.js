import { Link } from 'react-router-dom';

// styles
import styles from './PageNonexistent.module.scss';

const PageNonexistent = () => (
  <main className={styles.wrapper}>
    <div>404 no page here</div>

    <Link className={styles.link} to="/">
      home
    </Link>
  </main>
);

export default PageNonexistent;
