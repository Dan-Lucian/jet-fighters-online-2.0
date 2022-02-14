// shared components
import { useContextWebsocket } from '../../../../../providers/ProviderWebsocket';
import { useContextSettings } from '../../../../../providers/ProviderSettings';

// styles
import styles from './BtnJoin.module.scss';

const BtnJoin = () => {
  const { sendMessage } = useContextWebsocket();
  const [settings] = useContextSettings();

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
