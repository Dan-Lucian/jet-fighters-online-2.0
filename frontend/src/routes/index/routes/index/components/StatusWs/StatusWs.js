// shared hooks
import { useContextWebsocket } from '../../../../../../providers/ProviderWebsocket';

// styles
import styles from './StatusWs.module.scss';

const StatusWs = () => {
  const { readyState, reconnect } = useContextWebsocket();

  switch (readyState) {
    case 'CONNECTING':
      return (
        <div className={`${styles.status} ${styles.connecting}`}>
          Connecting...
        </div>
      );

    case 'OPEN':
      return <div className={`${styles.status} ${styles.open}`}>Connected</div>;

    case 'CLOSED':
      return (
        <div className={`${styles.status} ${styles.closed}`}>
          Connection closed
          <button className={styles.btn} onClick={reconnect} type="button">
            Reconnect
          </button>
        </div>
      );

    default:
      return (
        <div className={`${styles.status} ${styles.error}`}>
          Connection error
          <button className={styles.btn} onClick={reconnect} type="button">
            Reconnect
          </button>
        </div>
      );
  }
};

export default StatusWs;
