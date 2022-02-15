// shared hooks
import { useContextWebsocket } from '../../../../../providers/ProviderWebsocket';

// styles
import styles from './StatusWs.module.scss';

const StatusWs = () => {
  const { readyState } = useContextWebsocket();

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
        </div>
      );

    default:
      return (
        <div className={`${styles.status} ${styles.error}`}>
          Connection error
        </div>
      );
  }
};

export default StatusWs;
