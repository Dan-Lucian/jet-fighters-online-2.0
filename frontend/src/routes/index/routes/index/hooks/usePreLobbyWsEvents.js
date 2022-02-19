import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// shared hooks
import { useContextGame } from '../../../../../providers/ProviderGame';
import { useContextUser } from '../../../../../providers/ProviderUser';
import { useContextLobby } from '../../../../../providers/ProviderLobby';
import { useContextWebsocket } from '../../../../../providers/ProviderWebsocket';

const usePreLobbyWsEvents = () => {
  const navigate = useNavigate();
  const [game, setGame] = useContextGame();
  const [, setUser] = useContextUser();
  const [, setLobby] = useContextLobby();
  const { message, resetMessage } = useContextWebsocket();

  const { statusGame } = game;
  const { event, success, idLobby } = message;

  useEffect(() => {
    const { name } = message;

    // this event is receveied by the one who attempt to create lobby
    if (success && event === 'create' && statusGame === 'preLobby') {
      console.log('EVENT: create');
      setGame((prev) => ({ ...prev, statusGame: 'lobby' }));
      setLobby((prev) => ({
        ...prev,
        idLobby,
        namePlayer1: name,
        isConnectedPlayer1: true,
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
      setGame((prev) => ({ ...prev, statusGame: 'lobby' }));
      setLobby((prev) => ({
        ...prev,
        idLobby,
        namePlayer1: nameOwner,
        namePlayer2: nameJoiner,
        isConnectedPlayer1: true,
        isConnectedPlayer2: true,
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
