import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// shared hooks
import { useContextGame } from '../../../../../providers/ProviderGame';
import { useContextUser } from '../../../../../providers/ProviderUser';
import { useContextLobby } from '../../../../../providers/ProviderLobby';
import { useContextWebsocket } from '../../../../../providers/ProviderWebsocket';

/**
 * Listens and reacts to all the server-sent websocket messages intended for
 * the application in the 'preLobby' game state.
 */
const usePreLobbyWsEvents = () => {
  const navigate = useNavigate();
  const [game, setGame] = useContextGame();
  const [, setUser] = useContextUser();
  const [, setLobby] = useContextLobby();
  const { message, resetMessage } = useContextWebsocket();

  const { stateGame } = game;
  const { event, success, idLobby } = message;

  const isStateGamePreLobby = stateGame === 'preLobby';

  useEffect(() => {
    const { name } = message;

    // receveied by the player who attempted to create a lobby
    if (isStateGamePreLobby && success && event === 'create') {
      console.log('EVENT: create');
      setGame((prev) => ({ ...prev, stateGame: 'lobby' }));
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

    // receveied by the player who attempted to join a lobby
    if (isStateGamePreLobby && success && event === 'joinResponse') {
      console.log('EVENT: joinRepsponse');
      const { nameOwner, nameJoiner } = message;

      setGame((prev) => ({ ...prev, stateGame: 'lobby' }));
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
