/* eslint-disable no-use-before-define */
import PropTypes from 'prop-types';

// styles
import styles from './TablePlayers.module.scss';

const TablePlayers = ({
  statusConnectionPlayer1,
  namePlayer1,
  scorePlayer1,
  isReadyPlayer1,
  statusConnectionPlayer2,
  namePlayer2,
  isReadyPlayer2,
  scorePlayer2,
}) => (
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
TablePlayers.propTypes = {
  statusConnectionPlayer1: PropTypes.string,
  namePlayer1: PropTypes.string,
  scorePlayer1: PropTypes.number,
  isReadyPlayer1: PropTypes.bool,
  statusConnectionPlayer2: PropTypes.string,
  namePlayer2: PropTypes.string,
  isReadyPlayer2: PropTypes.bool,
  scorePlayer2: PropTypes.number,
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
