// local components
import WrapperPreLobby from './components/WrapperPreLobby';
import BtnCreate from './components/BtnCreate';
import BtnJoin from './components/BtnJoin';
import StatusWs from './components/StatusWs';
import FormId from './components/FormId';

const PreLobby = () => (
  <WrapperPreLobby>
    <BtnCreate />
    <BtnJoin />
    <StatusWs />
    <FormId />
  </WrapperPreLobby>
);

export default PreLobby;
