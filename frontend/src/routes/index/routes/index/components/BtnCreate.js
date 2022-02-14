// shared components
import { useContextWebsocket } from '../../../../../providers/ProviderWebsocket';
import { useSettings } from '../../../../../providers/ProviderSettings';

// styles
import styles from './BtnCreate.module.scss';

const BtnCreate = () => {
  const { sendMessage } = useContextWebsocket();
  const [settings] = useSettings();

  const handleClick = () => {
    sendMessage({ ...settings, event: 'create' });
  };

  return (
    <button onClick={handleClick} className={styles.btnCreate} type="button">
      Create a lobby
    </button>
  );
};

export default BtnCreate;
