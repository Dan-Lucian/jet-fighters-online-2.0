// local components
import Header from './Header';
import Player from './Player';

// styles
import styles from './TablePlayers.module.scss';

const TablePlayers = () => (
  <div className={styles.table}>
    <Header />
    <Player />
    <Player />
  </div>
);

export default TablePlayers;
