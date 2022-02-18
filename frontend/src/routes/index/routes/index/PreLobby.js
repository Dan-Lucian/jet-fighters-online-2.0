// local hooks
import { usePreLobbyWsEvents } from './hooks/usePreLobbyWsEvents';

// local components
import WrapperPreLobby from './components/WrapperPreLobby';
import StatusCreate from './components/StatusCreate';
import StatusJoin from './components/StatusJoin';
import BtnCreate from './components/BtnCreate';
import BtnJoin from './components/BtnJoin';
import StatusWs from './components/StatusWs';
import FormId from './components/FormId';

const PreLobby = () => {
  usePreLobbyWsEvents();

  return (
    <WrapperPreLobby>
      <StatusCreate />
      <StatusJoin />
      <BtnCreate />
      <BtnJoin />
      <StatusWs />
      <FormId />
    </WrapperPreLobby>
  );
};

export default PreLobby;
