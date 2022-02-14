import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// shared hooks
import { useContextWebsocket } from '../../../../providers/ProviderWebsocket';
import { useContextSettings } from '../../../../providers/ProviderSettings';
import { useContextGame } from '../../../../providers/ProviderGame';

// local components
import WrapperPreLobby from './components/WrapperPreLobby';
import BtnCreate from './components/BtnCreate';
import BtnJoin from './components/BtnJoin';
import StatusWs from './components/StatusWs';
import FormId from './components/FormId';

const PreLobby = () => {
  const { message, sendMessage } = useContextWebsocket();
  const [settings] = useContextSettings();
  const [game, setGame] = useContextGame();
  const navigate = useNavigate();

  useEffect(() => {
    if (message.event === 'createAllowed' && game.status === 'pre-lobby') {
      setGame((prev) => ({
        ...prev,
        idLobby: message.idLobby,
        status: 'lobby',
        isOwnerLobby: true,
      }));
      navigate('/lobby');
    }
  });

  const handleClickCreate = () => {
    sendMessage({ ...settings, event: 'create' });
  };

  const handleClickJoin = () => {
    sendMessage({ ...settings, event: 'join' });
  };

  return (
    <WrapperPreLobby>
      <BtnCreate onClick={handleClickCreate} />
      <BtnJoin onClick={handleClickJoin} />
      <StatusWs />
      <FormId />
    </WrapperPreLobby>
  );
};

export default PreLobby;
