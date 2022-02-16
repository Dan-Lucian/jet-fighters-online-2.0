import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// shared hooks
import { useContextWebsocket } from '../../../../providers/ProviderWebsocket';
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
  const { message } = useContextWebsocket();
  const [, setUser] = useContextUser();
  const [game, setGame] = useContextGame();
  const navigate = useNavigate();

  const { event, success, idLobby } = message;
  const { statusGame } = game;

  useEffect(() => {
    const { name } = message;

    // this event is receveied by the one who attempt to create lobby
    if (success && event === 'create' && statusGame === 'preLobby') {
      setGame((prev) => ({
        ...prev,
        idLobby,
        statusGame: 'lobby',
        namePlayer1: name,
        statusConnectionPlayer1: 'connected',
      }));
      setUser((prev) => ({
        ...prev,
        isOwnerLobby: true,
      }));
      navigate('/lobby');
    }

    // this event is receveied by the one who attempt to join lobby
    if (success && event === 'join' && statusGame === 'preLobby') {
      console.log('lobby + prelobby event fired');
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
