import { useNavigate } from 'react-router-dom';

// shared hooks
import { useContextGame } from '../../../../../providers/ProviderGame';
import { useContextUser } from '../../../../../providers/ProviderUser';
import {
  useContextLobby,
  valueDefaultProviderLobby,
} from '../../../../../providers/ProviderLobby';
import { useContextWebsocket } from '../../../../../providers/ProviderWebsocket';

// styles
import styles from './BtnQuit.module.scss';

const BtnQuit = () => {
  const navigate = useNavigate();
  const [game, setGame] = useContextGame();
  const [user] = useContextUser();
  const [lobby, setLobby] = useContextLobby();
  const { sendMessage } = useContextWebsocket();

  const { statusGame } = game;
  const { isOwnerLobby } = user;
  const { idLobby } = lobby;

  const getHandlerClick = () => {
    if (statusGame === 'lobby')
      return () => {
        sendMessage({
          event: 'quitLobby',
          idLobby,
          isOwnerLobby,
        });
        setGame((prev) => ({ ...prev, statusGame: 'preLobby' }));
        setLobby({ ...valueDefaultProviderLobby });
        navigate('/');
      };

    return () =>
      console.log(
        `quit denial because needed statusGame=lobby but currently statusGame=${statusGame}`
      );
  };

  return (
    <button onClick={getHandlerClick()} className={styles.btn} type="button">
      Quit lobby
    </button>
  );
};

export default BtnQuit;
