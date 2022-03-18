// shared hooks
import { useContextLobby } from '../../../../providers/ProviderLobby';

// local hooks
import useLobbyWsEvents from './hooks/useLobbyWsEvents';
import useUnmountWsMessage from './hooks/useUnmountWsMessage';

// local components
import IdLobby from './components/IdLobby';
import TablePlayers from './components/TablePlayers';
import BtnReady from './components/BtnReady';
import BtnStart from './components/BtnStart';
import BtnQuit from './components/BtnQuit';

// styles
import styles from './Lobby.module.scss';

const Lobby = () => {
  useLobbyWsEvents();
  useUnmountWsMessage();
  const [lobby] = useContextLobby();

  const { idLobby } = lobby;

  return (
    <div className={styles.wrapper}>
      <IdLobby idLobby={idLobby} />
      <TablePlayers />
      <BtnQuit />
      <BtnReady />
      <BtnStart />
    </div>
  );
};

export default Lobby;
