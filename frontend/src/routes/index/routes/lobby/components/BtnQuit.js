import { useNavigate } from 'react-router-dom';

// shared hooks
import { useContextWebsocket } from '../../../../../providers/ProviderWebsocket';
import {
  useContextGame,
  valueDefaultProviderGame,
} from '../../../../../providers/ProviderGame';
import { useContextUser } from '../../../../../providers/ProviderUser';

// styles
import styles from './BtnQuit.module.scss';

const BtnQuit = () => {
  const { sendMessage } = useContextWebsocket();
  const [game, setGame] = useContextGame();
  const [user] = useContextUser();
  const navigate = useNavigate();

  const { statusGame, idLobby } = game;
  const { isOwnerLobby } = user;

  const getHandlerClick = () => {
    if (statusGame === 'lobby')
      return () => {
        sendMessage({
          event: 'quitLobby',
          idLobby,
          isOwnerLobby,
        });

        setGame({ ...valueDefaultProviderGame });
        console.log('value default', { ...valueDefaultProviderGame });
        navigate('/');
      };

    return () =>
      console.log(
        `quit denial because needed statusGame: lobby but currently statusGame: ${statusGame}`
      );
  };

  return (
    <button onClick={getHandlerClick()} className={styles.btn} type="button">
      Quit lobby
    </button>
  );
};

export default BtnQuit;
