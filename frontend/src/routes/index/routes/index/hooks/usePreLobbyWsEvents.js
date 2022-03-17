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
        nameOwner: name,
        isConnectedOwner: true,
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
        nameOwner,
        nameJoiner,
        isConnectedOwner: true,
        isConnectedJoiner: true,
      }));

      // here is no resetMessage(); because when joiner receives 'joinResponse'
      // the second follow up 'updateLobby' ws event from server is too fast and
      // the reset from here would reset that event as well, but that event is
      // needed for lobby syncing later
      navigate('/lobby');
    }
  }, [message]);
};

export { usePreLobbyWsEvents };
