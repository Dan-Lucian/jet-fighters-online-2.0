// shared hooks
import { useContextWebsocket } from '../../../../../providers/ProviderWebsocket';

// styles
import styles from './StatusCreate.module.scss';

const StatusCreate = () => {
  const { message } = useContextWebsocket();
  const { event, success, reason } = message;

  let text = 'No lobby created';

  if (event === 'create' && !success && reason === 'lobbyAlreadyCreated') {
    text = `You are in a lobby already`;
  }

  return <div className={styles.statusCreate}>{text}</div>;
};

export default StatusCreate;
