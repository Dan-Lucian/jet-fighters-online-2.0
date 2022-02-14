// shared components
import { useContextWebsocket } from '../../../../../providers/ProviderWebsocket';
import { useSettings } from '../../../../../providers/ProviderSettings';

// styles
import styles from './BtnJoin.module.scss';

const BtnJoin = () => {
  const { sendMessage } = useContextWebsocket();
  const [settings] = useSettings();

  const handleClick = () => {
    sendMessage({ ...settings, event: 'join' });
  };

  return (
    <button onClick={handleClick} className={styles.btnJoin} type="button">
      Join a lobby
    </button>
  );
};

export default BtnJoin;
