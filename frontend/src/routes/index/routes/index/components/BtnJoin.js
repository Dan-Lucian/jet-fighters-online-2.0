// shared hooks
import { useContextGame } from '../../../../../providers/ProviderGame';
import { useContextUser } from '../../../../../providers/ProviderUser';
import { useContextSettings } from '../../../../../providers/ProviderSettings';
import { useContextWebsocket } from '../../../../../providers/ProviderWebsocket';

// styles
import styles from './BtnJoin.module.scss';

const BtnJoin = () => {
  const [game] = useContextGame();
  const [user] = useContextUser();
  const [settings] = useContextSettings();
  const { sendMessage } = useContextWebsocket();

  const { stateGame } = game;
  const { name } = user;
  const { idJoin } = settings;

  const isstateGamePreLobby = stateGame === 'preLobby';

  const getHandlerClick = () => {
    if (isstateGamePreLobby)
      return () => {
        sendMessage({
          name,
          idLobby: idJoin,
          event: 'join',
        });
      };

    return () =>
      console.log(
        `join denial because needed stateGame: preLobby but currently stateGame: ${stateGame}`
      );
  };

  return (
    <button
      disabled={!isstateGamePreLobby}
      onClick={getHandlerClick()}
      className={styles.btnJoin}
      type="button"
    >
      Join a lobby
    </button>
  );
};

export default BtnJoin;
