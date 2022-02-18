// shared hooks
import { useContextGame } from '../../../../providers/ProviderGame';

// local hooks
import { useLobbyWsEvents } from './hooks/useLobbyWsEvents';
import { useUnmountWsMessage } from './hooks/useUnmountWsMessage';

// local components
import WrapperLobby from './components/WrapperLobby';
import IdLobby from './components/IdLobby';
import TablePlayers from './components/TablePlayers';
import BtnReady from './components/BtnReady';
import BtnStart from './components/BtnStart';
import BtnQuit from './components/BtnQuit';

const Lobby = () => {
  useLobbyWsEvents();
  useUnmountWsMessage();
  const [game] = useContextGame();

  const { idLobby } = game;

  return (
    <WrapperLobby>
      <IdLobby idLobby={idLobby} />
      <TablePlayers />
      <BtnQuit />
      <BtnReady />
      <BtnStart />
    </WrapperLobby>
  );
};

export default Lobby;
