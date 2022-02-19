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

  const { stateGame } = game;
  const { name } = user;

  const isstateGamePreLobby = stateGame === 'preLobby';

  const getHandlerClick = () => {
    if (isstateGamePreLobby)
      return () => sendMessage({ name, event: 'create' });

    return () =>
      console.log(
        `create denial because needed stateGame: preLobby but currently stateGame: ${stateGame}`
      );
  };

  return (
    <button
      disabled={!isstateGamePreLobby}
      onClick={getHandlerClick()}
      className={styles.btnCreate}
      type="button"
    >
      Create a lobby
    </button>
  );
};

export default BtnCreate;
