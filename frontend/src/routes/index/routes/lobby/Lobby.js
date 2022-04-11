// shared hooks
import { useContextLobby } from '../../../../providers/ProviderLobby';

// local hooks
import useLobbyWsEvents from './hooks/useLobbyWsEvents';
import useUnmountWsMessage from './hooks/useUnmountWsMessage';

// local components
import IdLobby from './components/IdLobby/IdLobby';
import TablePlayers from './components/TablePlayers/TablePlayers';
import BtnReady from './components/BtnReady/BtnReady';
import BtnStart from './components/BtnStart/BtnStart';
import BtnQuit from './components/BtnQuit/BtnQuit';

// styles
import styles from './Lobby.module.scss';

const Lobby = () => {
  useLobbyWsEvents();
  useUnmountWsMessage();
  const [{ idLobby }] = useContextLobby();

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
