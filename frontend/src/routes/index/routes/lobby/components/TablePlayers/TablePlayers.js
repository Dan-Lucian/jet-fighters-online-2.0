/* eslint-disable no-use-before-define */
// shared hooks
import { useContextLobby } from '../../../../../../providers/ProviderLobby';

// styles
import styles from './TablePlayers.module.scss';

const TablePlayers = () => {
  const [lobby] = useContextLobby();

  const {
    isConnectedOwner,
    nameOwner,
    winsOwner,
    isReadyOwner,
    isConnectedJoiner,
    nameJoiner,
    isReadyJoiner,
    winsJoiner,
  } = lobby;

  return (
    <table className={styles.table}>
      <tbody>
        <tr>
          <td className={getStylesName(isConnectedOwner)}>
            {nameOwner}
            <span className={styles.textLight}> (owner)</span>
          </td>
          <td className={styles.score}>{winsOwner}</td>
          <td className={getStylesReady(isReadyOwner)}>ready</td>
        </tr>
        <tr>
          <td className={getStylesName(isConnectedJoiner)}>{nameJoiner}</td>
          <td className={styles.score}>{winsJoiner}</td>
          <td className={getStylesReady(isReadyJoiner)}>ready</td>
        </tr>
      </tbody>
    </table>
  );
};

// helper function to compose css module classes for name
const getStylesName = (isConnectedPlayer) => {
  if (isConnectedPlayer) return `${styles.name} ${styles.textGreen}`;
  return `${styles.name} ${styles.textRed}`;
};

// helper function to compose css module classes for ready
const getStylesReady = (isReadyPlayer) => {
  if (isReadyPlayer) return `${styles.ready} ${styles.bgGreen}`;
  return `${styles.ready} ${styles.bgRed}`;
};

export default TablePlayers;
