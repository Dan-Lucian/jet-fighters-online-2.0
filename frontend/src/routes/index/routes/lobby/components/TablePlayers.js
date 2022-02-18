/* eslint-disable no-use-before-define */
// shared hooks
import { useContextLobby } from '../../../../../providers/ProviderLobby';

// styles
import styles from './TablePlayers.module.scss';

const TablePlayers = () => {
  const [lobby] = useContextLobby();

  const {
    statusConnectionPlayer1,
    namePlayer1,
    scorePlayer1,
    isReadyPlayer1,
    statusConnectionPlayer2,
    namePlayer2,
    isReadyPlayer2,
    scorePlayer2,
  } = lobby;

  return (
    <table className={styles.table}>
      <tbody>
        <tr>
          <td className={getStylesName(statusConnectionPlayer1)}>
            {namePlayer1}
            <span className={styles.textLight}> (owner)</span>
          </td>
          <td className={styles.score}>{scorePlayer1}</td>
          <td className={getStylesReady(isReadyPlayer1)}>ready</td>
        </tr>
        <tr>
          <td className={getStylesName(statusConnectionPlayer2)}>
            {namePlayer2}
          </td>
          <td className={styles.score}>{scorePlayer2}</td>
          <td className={getStylesReady(isReadyPlayer2)}>ready</td>
        </tr>
      </tbody>
    </table>
  );
};

// helper function to compose css module classes for name
const getStylesName = (statusConnection) => {
  if (statusConnection === 'connected')
    return `${styles.name} ${styles.textGreen}`;
  return `${styles.name} ${styles.textRed}`;
};

// helper function to compose css module classes for ready
const getStylesReady = (statusReady) => {
  if (statusReady) return `${styles.ready} ${styles.bgGreen}`;
  return `${styles.ready} ${styles.bgRed}`;
};

export default TablePlayers;
