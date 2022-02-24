/* eslint-disable react/prop-types */

// local components
import Header from './Header';
import Player from './Player';

// styles
import styles from './TablePlayers.module.scss';

const TablePlayers = ({ stateGame }) => {
  const { owner, joiner } = stateGame;
  const { scoreMax } = stateGame.settings;

  return (
    <div className={styles.table}>
      <Header text={`Max score: ${scoreMax}`} />
      <Player player={owner} />
      <Player player={joiner} />
    </div>
  );
};

export default TablePlayers;
