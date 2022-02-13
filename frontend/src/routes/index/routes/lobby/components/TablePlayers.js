// styles
import styles from './TablePlayers.module.scss';

const TablePlayers = () => (
  <table className={styles.table}>
    <tbody>
      <tr>
        <td className={styles.name}>Randossssslfo</td>
        <td className={styles.score}>0</td>
        <td className={styles.ready}>ready</td>
      </tr>
      <tr>
        <td className={styles.name}>Castor</td>
        <td className={styles.score}>0</td>
        <td className={styles.ready}>ready</td>
      </tr>
    </tbody>
  </table>
);

export default TablePlayers;
