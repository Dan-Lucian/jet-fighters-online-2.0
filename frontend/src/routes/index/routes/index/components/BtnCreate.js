// shared hooks
import { useContextWebsocket } from '../../../../../providers/ProviderWebsocket';
import { useContextGame } from '../../../../../providers/ProviderGame';
import { useContextUser } from '../../../../../providers/ProviderUser';

// styles
import styles from './BtnCreate.module.scss';

const BtnCreate = () => {
  const { sendMessage } = useContextWebsocket();
  const [game] = useContextGame();
  const [user] = useContextUser();

  const { statusGame } = game;
  const { name } = user;

  const handleClick = () => {
    if (statusGame === 'preLobby') {
      sendMessage({ name, event: 'create' });
    } else {
      console.log('lobby already created');
    }
  };

  return (
    <button onClick={handleClick} className={styles.btnCreate} type="button">
      Create a lobby
    </button>
  );
};

export default BtnCreate;
