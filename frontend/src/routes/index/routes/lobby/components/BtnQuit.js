import { useNavigate } from 'react-router-dom';

// shared hooks
import { useContextWebsocket } from '../../../../../providers/ProviderWebsocket';
import {
  useContextLobby,
  valueDefaultProviderLobby,
} from '../../../../../providers/ProviderLobby';
import { useContextUser } from '../../../../../providers/ProviderUser';

// styles
import styles from './BtnQuit.module.scss';

const BtnQuit = () => {
  const { sendMessage } = useContextWebsocket();
  const [lobby, setLobby] = useContextLobby();
  const [user] = useContextUser();
  const navigate = useNavigate();

  const { statusGame, idLobby } = lobby;
  const { isOwnerLobby } = user;

  const getHandlerClick = () => {
    if (statusGame === 'lobby')
      return () => {
        sendMessage({
          event: 'quitLobby',
          idLobby,
          isOwnerLobby,
        });

        setLobby({ ...valueDefaultProviderLobby });
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
