import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// shared hooks
import { useContextGame } from '../../../../../providers/ProviderGame';
import { useContextUser } from '../../../../../providers/ProviderUser';
import { useContextSettings } from '../../../../../providers/ProviderSettings';
import {
  useContextLobby,
  valueDefaultProviderLobby,
} from '../../../../../providers/ProviderLobby';
import { useContextWebsocket } from '../../../../../providers/ProviderWebsocket';

/**
 * Listens and reacts to all the server-sent websocket messages intended for
 * the application in the 'lobby' game state.
 */
const useLobbyWsEvents = () => {
  const [game, setGame] = useContextGame();
  const [user] = useContextUser();
  const [settings] = useContextSettings();
  const [lobby, setLobby] = useContextLobby();
  const { message, sendMessage, resetMessage } = useContextWebsocket();
  const navigate = useNavigate();

  const { stateGame } = game;
  const { isOwnerLobby } = user;
  const { idLobby, isReadyPlayer1, isReadyPlayer2 } = lobby;
  const { event, success } = message;

  useEffect(() => {
    // receveied by both players when any of them makes a
    // lobby change (isReadyPlayer).
    if (event === 'updateLobby' && stateGame === 'lobby') {
      console.log('EVENT: updateLobby');
      // this lobby object is relayed from the player who requested a change
      setLobby(message.lobby);
      resetMessage();
    }

    // receveied by the one who created the lobby
    // about someone joining the lobby.
    if (success && event === 'join' && stateGame === 'lobby') {
      console.log('EVENT: join');
      const { idLobby: idLobbyReceived, nameOwner, nameJoiner } = message;

      setLobby((prev) => {
        const lobbyNew = {
          ...prev,
          idLobby: idLobbyReceived,
          namePlayer1: nameOwner,
          namePlayer2: nameJoiner,
          isConnectedPlayer2: true,
        };

        sendMessage({
          event: 'updateLobby',
          lobby: lobbyNew,
        });

        return lobbyNew;
      });
      resetMessage();
    }

    // received by the owner when the joiner quit the lobby.
    if (event === 'quitLobby' && stateGame === 'lobby') {
      console.log('EVENT: quitLobby');
      setLobby((prev) => ({
        ...prev,
        namePlayer2: 'Empty...',
        isConnectedPlayer2: false,
        isReadyPlayer2: false,
      }));
      resetMessage();
    }

    // received by the joiner when the owner quit the lobby
    if (event === 'destroyLobby' && stateGame === 'lobby') {
      console.log('EVENT: destroyLobby');
      setGame((prev) => ({ ...prev, stateGame: 'preLobby' }));
      setLobby({ ...valueDefaultProviderLobby });
      resetMessage();
      navigate('/');
    }

    // received when the server received a 'start' event
    // from another player which will happens only if the other player's
    // lobby showed that both players are ready.
    // The purpose is to double check readiness and also get the current
    // player's jet settings.
    if (event === 'requestReady' && stateGame === 'lobby') {
      console.log('EVENT: requestReady');
      sendMessage({
        event: 'responseReady',
        isReady: isReadyPlayer1 && isReadyPlayer2,
        idLobby,
        settings,
        isOwnerLobby,
      });
      resetMessage();
    }

    // received when the server is starting the real-time game.
    if (event === 'start' && stateGame === 'lobby') {
      console.log('EVENT: start');
      setGame((prev) => ({ ...prev, stateGame: 'game' }));
      resetMessage();
      navigate('/game');
    }
  }, [message]);
};

export { useLobbyWsEvents };
