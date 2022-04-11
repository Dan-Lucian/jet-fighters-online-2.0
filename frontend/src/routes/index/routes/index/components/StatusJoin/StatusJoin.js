// shared hooks
import { useContextWebsocket } from '../../../../../../providers/ProviderWebsocket';

// styles
import styles from './StatusJoin.module.scss';

const StatusJoin = () => {
  const { message } = useContextWebsocket();
  const { event, success, reason } = message;

  let text = '';

  if (event === 'joinResponse' && !success) {
    switch (reason) {
      case 'notFound':
        text = `Lobby not found`;
        break;

      case 'full':
        text = 'Lobby full';
        break;

      case 'same name':
        text = `You can't join your own lobby`;
        break;

      default:
        console.error('Join fail, ', reason);
        text = 'Uknown failure';
    }
  }

  return <div className={styles.statusJoin}>{text}</div>;
};

export default StatusJoin;
