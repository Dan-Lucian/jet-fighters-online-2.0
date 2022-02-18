import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// shared hooks
import { useContextWebsocket } from '../../../../../providers/ProviderWebsocket';
import { useContextGame } from '../../../../../providers/ProviderGame';
import { useContextUser } from '../../../../../providers/ProviderUser';

const usePreLobbyWsEvents = () => {
  const { message, resetMessage } = useContextWebsocket();
  const [, setUser] = useContextUser();
  const [game, setGame] = useContextGame();
  const navigate = useNavigate();

  const { event, success, idLobby } = message;
  const { statusGame } = game;

  useEffect(() => {
    const { name } = message;

    // this event is receveied by the one who attempt to create lobby
    if (success && event === 'create' && statusGame === 'preLobby') {
      console.log('EVENT: create');
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
      resetMessage();
      navigate('/lobby');
    }

    // this event is receveied by the one who attempt to join lobby
    if (success && event === 'joinResponse' && statusGame === 'preLobby') {
      console.log('EVENT: joinRepsponse');
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
      resetMessage();
      navigate('/lobby');
    }
  }, [message]);
};

export { usePreLobbyWsEvents };
