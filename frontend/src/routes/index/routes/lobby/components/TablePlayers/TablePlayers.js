// shared hooks
import { useContextLobby } from '../../../../../../providers/ProviderLobby';

// styles
import styles from './TablePlayers.module.scss';

const TablePlayers = () => {
  const [
    {
      isConnectedOwner,
      nameOwner,
      winsOwner,
      isReadyOwner,
      isConnectedJoiner,
      nameJoiner,
      isReadyJoiner,
      winsJoiner,
    },
  ] = useContextLobby();

  return (
    <table className={styles.table}>
      <tbody>
        <tr>
          <td className={getStylesForName(isConnectedOwner)}>
            {nameOwner}
            <span className={styles.textLight}> (owner)</span>
          </td>
          <td className={styles.score}>{winsOwner}</td>
          <td className={getStylesForReady(isReadyOwner)}>ready</td>
        </tr>
        <tr>
          <td className={getStylesForName(isConnectedJoiner)}>{nameJoiner}</td>
          <td className={styles.score}>{winsJoiner}</td>
          <td className={getStylesForReady(isReadyJoiner)}>ready</td>
        </tr>
      </tbody>
    </table>
  );
};

// compose css module classes for name
const getStylesForName = (isConnectedPlayer) => {
  if (isConnectedPlayer) return `${styles.name} ${styles.textGreen}`;
  return `${styles.name} ${styles.textRed}`;
};

// compose css module classes for ready
const getStylesForReady = (isReadyPlayer) => {
  if (isReadyPlayer) return `${styles.ready} ${styles.bgGreen}`;
  return `${styles.ready} ${styles.bgRed}`;
};

export default TablePlayers;
