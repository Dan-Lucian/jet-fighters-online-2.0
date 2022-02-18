// shared hooks
import { useContextWebsocket } from '../../../../../providers/ProviderWebsocket';
import { useContextUser } from '../../../../../providers/ProviderUser';
import { useContextSettings } from '../../../../../providers/ProviderSettings';
import { useContextLobby } from '../../../../../providers/ProviderLobby';

// styles
import styles from './BtnJoin.module.scss';

const BtnJoin = () => {
  const { sendMessage } = useContextWebsocket();
  const [settings] = useContextSettings();
  const [user] = useContextUser();
  const [lobby] = useContextLobby();

  const { name } = user;
  const { idJoin } = settings;
  const { statusGame } = lobby;

  const getHandlerClick = () => {
    if (statusGame === 'preLobby')
      return () => {
        sendMessage({
          name,
          idLobby: idJoin,
          event: 'join',
        });
      };

    return () =>
      console.log(
        `join denial because needed statusGame: preLobby but currently statusGame: ${statusGame}`
      );
  };

  return (
    <button
      onClick={getHandlerClick()}
      className={styles.btnJoin}
      type="button"
    >
      Join a lobby
    </button>
  );
};

export default BtnJoin;
