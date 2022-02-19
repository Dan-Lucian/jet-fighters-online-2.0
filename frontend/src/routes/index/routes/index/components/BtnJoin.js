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

  const { statusGame } = game;
  const { name } = user;
  const { idJoin } = settings;

  const isStatusGamePreLobby = statusGame === 'preLobby';

  const getHandlerClick = () => {
    if (isStatusGamePreLobby)
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
      disabled={!isStatusGamePreLobby}
      onClick={getHandlerClick()}
      className={styles.btnJoin}
      type="button"
    >
      Join a lobby
    </button>
  );
};

export default BtnJoin;
