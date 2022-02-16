// shared hooks
import { useContextWebsocket } from '../../../../../providers/ProviderWebsocket';
import { useContextUser } from '../../../../../providers/ProviderUser';
import { useContextSettings } from '../../../../../providers/ProviderSettings';
import { useContextGame } from '../../../../../providers/ProviderGame';

// styles
import styles from './BtnJoin.module.scss';

const BtnJoin = () => {
  const { sendMessage } = useContextWebsocket();
  const [settings] = useContextSettings();
  const [user] = useContextUser();
  const [game] = useContextGame();

  const { name } = user;
  const { idJoin } = settings;
  const { statusGame } = game;

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
