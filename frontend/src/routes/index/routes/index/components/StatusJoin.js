// shared hooks
import { useContextWebsocket } from '../../../../../providers/ProviderWebsocket';

// styles
import styles from './StatusJoin.module.scss';

const StatusJoin = () => {
  const { message } = useContextWebsocket();
  const { event, success, reason } = message;

  let text = 'No lobby joined';

  if (event === 'join' && !success) {
    switch (reason) {
      case 'notFound':
        text = `Lobby not found`;
        break;

      case 'full':
        text = `Lobby full`;
        break;

      default:
        text = 'Uknown failure';
    }
  }

  return <div className={styles.statusJoin}>{text}</div>;
};

export default StatusJoin;
