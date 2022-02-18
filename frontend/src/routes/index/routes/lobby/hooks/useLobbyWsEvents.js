import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// shared hooks
import { useContextWebsocket } from '../../../../../providers/ProviderWebsocket';
import {
  useContextLobby,
  valueDefaultProviderLobby,
} from '../../../../../providers/ProviderLobby';
import { useContextSettings } from '../../../../../providers/ProviderSettings';
import { useContextUser } from '../../../../../providers/ProviderUser';

const useLobbyWsEvents = () => {
  const { message, sendMessage, resetMessage } = useContextWebsocket();
  const [lobby, setLobby] = useContextLobby();
  const [settings] = useContextSettings();
  const [user] = useContextUser();
  const navigate = useNavigate();

  const { event, success } = message;
  const { idLobby, statusGame, isReadyPlayer1, isReadyPlayer2 } = lobby;
  const { isOwnerLobby } = user;

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
      setLobby((prev) => {
        const lobbyNew = {
          ...prev,
          idLobby: message.idLobby,
          namePlayer1: message.nameOwner,
          namePlayer2: message.nameJoiner,
          statusConnectionPlayer2: 'connected',
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
        statusConnectionPlayer2: 'notConnected',
        isReadyPlayer2: false,
      }));
      resetMessage();
    }

    if (event === 'destroyLobby' && statusGame === 'lobby') {
      console.log('EVENT: destroyLobby');
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
      setLobby((prev) => ({
        ...prev,
        statusGame: 'game',
      }));
      resetMessage();
      navigate('/game');
    }
  }, [message]);
};

export { useLobbyWsEvents };
