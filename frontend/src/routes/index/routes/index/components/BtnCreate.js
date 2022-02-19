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

  const isStatusGamePreLobby = statusGame === 'preLobby';

  const getHandlerClick = () => {
    if (isStatusGamePreLobby)
      return () => sendMessage({ name, event: 'create' });

    return () =>
      console.log(
        `create denial because needed statusGame: preLobby but currently statusGame: ${statusGame}`
      );
  };

  return (
    <button
      disabled={!isStatusGamePreLobby}
      onClick={getHandlerClick()}
      className={styles.btnCreate}
      type="button"
    >
      Create a lobby
    </button>
  );
};

export default BtnCreate;
