// shared hooks
import { useContextWebsocket } from '../../../../../providers/ProviderWebsocket';
import { useContextLobby } from '../../../../../providers/ProviderLobby';
import { useContextUser } from '../../../../../providers/ProviderUser';

// styles
import styles from './BtnCreate.module.scss';

const BtnCreate = () => {
  const { sendMessage } = useContextWebsocket();
  const [lobby] = useContextLobby();
  const [user] = useContextUser();

  const { statusGame } = lobby;
  const { name } = user;

  const getHandlerClick = () => {
    if (statusGame === 'preLobby')
      return () => sendMessage({ name, event: 'create' });

    return () =>
      console.log(
        `create denial because needed statusGame: preLobby but currently statusGame: ${statusGame}`
      );
  };

  return (
    <button
      onClick={getHandlerClick()}
      className={styles.btnCreate}
      type="button"
    >
      Create a lobby
    </button>
  );
};

export default BtnCreate;
