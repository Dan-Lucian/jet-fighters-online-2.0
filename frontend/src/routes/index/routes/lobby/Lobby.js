// local components
import WrapperLobby from './components/WrapperLobby';
import Title from './components/Title';
import TablePlayers from './components/TablePlayers';
import StatusPlayer from './components/StatusPlayer';
import BtnReady from './components/BtnReady';
import BtnStart from './components/BtnStart';

const Lobby = () => (
  <WrapperLobby>
    <Title>Lobby ID: x123456</Title>
    <TablePlayers />
    <StatusPlayer />
    <BtnReady />
    <BtnStart />
  </WrapperLobby>
);

export default Lobby;
