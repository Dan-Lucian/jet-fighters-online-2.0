import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// shared hooks
import { useContextWebsocket } from '../../../../providers/ProviderWebsocket';
import { useContextGame } from '../../../../providers/ProviderGame';
import { useContextSettings } from '../../../../providers/ProviderSettings';

// local components
import WrapperPreLobby from './components/WrapperPreLobby';
import StatusCreate from './components/StatusCreate';
import StatusJoin from './components/StatusJoin';
import BtnCreate from './components/BtnCreate';
import BtnJoin from './components/BtnJoin';
import StatusWs from './components/StatusWs';
import FormId from './components/FormId';

const PreLobby = () => {
  const { message, sendMessage } = useContextWebsocket();
  const [game, setGame] = useContextGame();
  const [settings] = useContextSettings();
  const navigate = useNavigate();

  const { event, success, idLobby } = message;
  const { namePlayerCurrent, statusGame } = game;

  useEffect(() => {
    if (event === 'create' && success && statusGame === 'preLobby') {
      setGame((prev) => ({
        ...prev,
        idLobby,
        statusGame: 'lobby',
        isOwnerLobby: true,
        statusConnectionPlayer1: 'connected',
      }));
      navigate('/lobby');
    }

    if (event === 'join' && success && statusGame === 'preLobby') {
      const { nameOwner, nameJoiner } = message;
      setGame((prev) => ({
        ...prev,
        idLobby,
        statusGame: 'lobby',
        isOwnerLobby: false,
        namePlayer1: nameOwner,
        namePlayer2: nameJoiner,
        statusConnectionPlayer1: 'connected',
        statusConnectionPlayer2: 'connected',
      }));
      navigate('/lobby');
    }
  }, [message]);

  const handleClickCreate = () => {
    sendMessage({ namePlayerCurrent, event: 'create' });
  };

  const handleClickJoin = () => {
    sendMessage({ namePlayerCurrent, idLobby: settings.idJoin, event: 'join' });
  };

  return (
    <WrapperPreLobby>
      <StatusCreate />
      <StatusJoin />
      <BtnCreate onClick={handleClickCreate} />
      <BtnJoin onClick={handleClickJoin} />
      <StatusWs />
      <FormId />
    </WrapperPreLobby>
  );
};

export default PreLobby;
