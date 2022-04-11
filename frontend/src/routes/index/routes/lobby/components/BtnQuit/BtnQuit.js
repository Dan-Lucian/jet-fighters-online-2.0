import { useNavigate } from 'react-router-dom';

// shared hooks
import { useContextGlobal } from '../../../../../../providers/ProviderGlobal';
import {
  useContextLobby,
  valueDefaultProviderLobby,
} from '../../../../../../providers/ProviderLobby';
import { useContextWebsocket } from '../../../../../../providers/ProviderWebsocket';

// styles
import styles from './BtnQuit.module.scss';

const BtnQuit = () => {
  const navigate = useNavigate();
  const [global, setGlobal] = useContextGlobal();
  const [lobby, setLobby] = useContextLobby();
  const { sendMessage } = useContextWebsocket();

  const { stateApp, isOwnerLobby } = global;
  const { idLobby } = lobby;

  const isStateAppLobby = stateApp === 'lobby';

  const getHandlerClick = () => {
    if (isStateAppLobby)
      return () => {
        sendMessage({
          event: 'quitLobby',
          idLobby,
          isOwnerLobby,
        });
        setGlobal((prev) => ({ ...prev, stateApp: 'preLobby' }));
        setLobby({ ...valueDefaultProviderLobby });
        navigate('/');
      };

    return () =>
      console.log(
        `quit denial because needed stateApp=lobby but currently stateApp=${stateApp}`
      );
  };

  return (
    <button
      disabled={!isStateAppLobby}
      onClick={getHandlerClick()}
      className={styles.btn}
      type="button"
    >
      Quit lobby
    </button>
  );
};

export default BtnQuit;
