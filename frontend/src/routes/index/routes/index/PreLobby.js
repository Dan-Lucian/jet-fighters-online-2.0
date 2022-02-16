import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// shared hooks
import { useContextWebsocket } from '../../../../providers/ProviderWebsocket';
import { useContextSettings } from '../../../../providers/ProviderSettings';
import { useContextGame } from '../../../../providers/ProviderGame';
import { useContextUser } from '../../../../providers/ProviderUser';

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
  const [user, setUser] = useContextUser();
  const [game, setGame] = useContextGame();
  const [settings] = useContextSettings();
  const navigate = useNavigate();

  const { event, success, idLobby } = message;
  const { statusGame } = game;

  useEffect(() => {
    if (event === 'create' && success && statusGame === 'preLobby') {
      setGame((prev) => ({
        ...prev,
        idLobby,
        statusGame: 'lobby',
        namePlayer1: message.name,
        statusConnectionPlayer1: 'connected',
      }));
      setUser((prev) => ({
        ...prev,
        isOwnerLobby: true,
      }));
      navigate('/lobby');
    }

    if (event === 'join' && success && statusGame === 'preLobby') {
      const { nameOwner, nameJoiner } = message;
      setGame((prev) => ({
        ...prev,
        idLobby,
        statusGame: 'lobby',
        namePlayer1: nameOwner,
        namePlayer2: nameJoiner,
        statusConnectionPlayer1: 'connected',
        statusConnectionPlayer2: 'connected',
      }));
      setUser((prev) => ({
        ...prev,
        isOwnerLobby: false,
      }));
      navigate('/lobby');
    }
  }, [message]);

  const handleClickCreate = () => {
    if (statusGame === 'preLobby') {
      sendMessage({ name: user.name, event: 'create' });
    } else {
      console.log('lobby already created');
    }
  };

  const handleClickJoin = () => {
    sendMessage({
      name: user.name,
      idLobby: settings.idJoin,
      event: 'join',
    });
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
