// shared hooks
import { useContextWebsocket } from '../../../../../providers/ProviderWebsocket';
import { useContextUser } from '../../../../../providers/ProviderUser';
import { useContextSettings } from '../../../../../providers/ProviderSettings';

// styles
import styles from './BtnJoin.module.scss';

const BtnJoin = () => {
  const { sendMessage } = useContextWebsocket();
  const [settings] = useContextSettings();
  const [user] = useContextUser();

  const { name } = user;
  const { idJoin } = settings;

  const handleClick = () => {
    sendMessage({
      name,
      idLobby: idJoin,
      event: 'join',
    });
  };

  return (
    <button onClick={handleClick} className={styles.btnJoin} type="button">
      Join a lobby
    </button>
  );
};

export default BtnJoin;
