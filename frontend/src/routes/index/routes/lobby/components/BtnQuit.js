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

  const handleClick = () => {
    if (statusGame === 'lobby') {
      sendMessage({
        event: 'quitLobby',
        idLobby,
        isOwnerLobby,
      });

      setGame({ ...valueDefaultProviderGame });
      console.log('value default', { ...valueDefaultProviderGame });
      navigate('/');
    }
  };

  return (
    <button onClick={handleClick} className={styles.btn} type="button">
      Quit lobby
    </button>
  );
};

export default BtnQuit;
