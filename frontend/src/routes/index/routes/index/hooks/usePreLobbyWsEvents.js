import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// shared hooks
import { useContextGlobal } from '../../../../../providers/ProviderGlobal';
import { useContextLobby } from '../../../../../providers/ProviderLobby';
import { useContextWebsocket } from '../../../../../providers/ProviderWebsocket';

/**
 * Listens and reacts to all the server-sent websocket messages intended for
 * the application in the 'preLobby' game state.
 */
const usePreLobbyWsEvents = () => {
  const navigate = useNavigate();
  const [global, setGlobal] = useContextGlobal();
  const [, setLobby] = useContextLobby();
  const { message, resetMessage } = useContextWebsocket();

  const { stateApp } = global;
  const { event, success, idLobby } = message;

  const isStateAppPreLobby = stateApp === 'preLobby';

  useEffect(() => {
    const { name } = message;

    // receveied by the player who attempted to create a lobby
    if (isStateAppPreLobby && success && event === 'create') {
      console.log('EVENT: create');
      setGlobal((prev) => ({ ...prev, stateApp: 'lobby', isOwnerLobby: true }));
      setLobby((prev) => ({
        ...prev,
        idLobby,
        namePlayer1: name,
        isConnectedPlayer1: true,
      }));
      resetMessage();
      navigate('/lobby');
    }

    // receveied by the player who attempted to join a lobby
    if (isStateAppPreLobby && success && event === 'joinResponse') {
      console.log('EVENT: joinRepsponse');
      const { nameOwner, nameJoiner } = message;

      setGlobal((prev) => ({
        ...prev,
        stateApp: 'lobby',
        isOwnerLobby: false,
      }));
      setLobby((prev) => ({
        ...prev,
        idLobby,
        namePlayer1: nameOwner,
        namePlayer2: nameJoiner,
        isConnectedPlayer1: true,
        isConnectedPlayer2: true,
      }));
      resetMessage();
      navigate('/lobby');
    }
  }, [message]);
};

export { usePreLobbyWsEvents };
