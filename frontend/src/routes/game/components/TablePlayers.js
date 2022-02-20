// shared hooks
// import { useContextGame } from '../../../providers/ProviderGame';

// local components
import Header from './Header';
import Player from './Player';

// styles
import styles from './TablePlayers.module.scss';

const TablePlayers = () => {
  const [game] = useContextGame();
  const { owner, joiner } = game;
  const { scoreMax } = game.settings;

  return (
    <div className={styles.table}>
      <Header text={`Max score: ${scoreMax}`} />
      <Player player={owner} />
      <Player player={joiner} />
    </div>
  );
};

export default TablePlayers;
