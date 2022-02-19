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

const useLobbyWsEvents = () => {
  const [game, setGame] = useContextGame();
  const [user] = useContextUser();
  const [settings] = useContextSettings();
  const [lobby, setLobby] = useContextLobby();
  const { message, sendMessage, resetMessage } = useContextWebsocket();
  const navigate = useNavigate();

  const { statusGame } = game;
  const { isOwnerLobby } = user;
  const { idLobby, isReadyPlayer1, isReadyPlayer2 } = lobby;
  const { event, success } = message;

  useEffect(() => {
    // this event is receveied by both players
    if (event === 'updateLobby' && statusGame === 'lobby') {
      console.log('EVENT: updateLobby');
      // this lobby object is relayed from the player who requested a change
      setLobby(message.lobby);
      resetMessage();
    }

    // this event is receveied by the one who created the lobby
    // about someone joining the lobby
    if (success && event === 'join' && statusGame === 'lobby') {
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

    if (event === 'quitLobby' && statusGame === 'lobby') {
      console.log('EVENT: quitLobby');
      setLobby((prev) => ({
        ...prev,
        namePlayer2: 'Empty...',
        isConnectedPlayer2: false,
        isReadyPlayer2: false,
      }));
      resetMessage();
    }

    if (event === 'destroyLobby' && statusGame === 'lobby') {
      console.log('EVENT: destroyLobby');
      setGame((prev) => ({ ...prev, statusGame: 'preLobby' }));
      setLobby({ ...valueDefaultProviderLobby });
      resetMessage();
      navigate('/');
    }

    // received when server received start event from another player which will
    // happen only if the other player's lobby shows that both players are ready
    // the purpose is to double check rediness and get the jet settings
    if (event === 'requestReady' && statusGame === 'lobby') {
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

    // received when server starts the real-time lobby
    if (event === 'start' && statusGame === 'lobby') {
      console.log('EVENT: start');
      setGame((prev) => ({ ...prev, statusGame: 'game' }));
      resetMessage();
      navigate('/game');
    }
  }, [message]);
};

export { useLobbyWsEvents };
