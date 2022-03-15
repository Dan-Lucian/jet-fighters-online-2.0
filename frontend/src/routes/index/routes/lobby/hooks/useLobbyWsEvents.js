import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// shared hooks
import { useContextGlobal } from '../../../../../providers/ProviderGlobal';
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
  const [global, setGlobal] = useContextGlobal();
  const [settings] = useContextSettings();
  const [lobby, setLobby] = useContextLobby();
  const { message, sendMessage, resetMessage } = useContextWebsocket();
  const navigate = useNavigate();

  const { stateApp } = global;
  const { isOwnerLobby } = global;
  const { idLobby, isReadyOwner, isReadyJoiner } = lobby;
  const { event, success } = message;

  const isStateAppLobby = stateApp === 'lobby';

  useEffect(() => {
    // receveied by both players when any of them makes a
    // lobby change (isReadyPlayer).
    if (isStateAppLobby && event === 'updateLobby') {
      console.log('EVENT: updateLobby');
      // this lobby object is relayed from the player who requested a change
      setLobby(message.lobby);
      resetMessage();
    }

    // receveied by the one who created the lobby
    // about someone joining the lobby.
    if (isStateAppLobby && success && event === 'join') {
      console.log('EVENT: join');
      const { idLobby: idLobbyReceived, nameOwner, nameJoiner } = message;

      setLobby((prev) => {
        const lobbyNew = {
          ...prev,
          idLobby: idLobbyReceived,
          nameOwner,
          nameJoiner,
          isConnectedJoiner: true,
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
    if (isStateAppLobby && event === 'quitJoiner') {
      console.log('EVENT: quitJoiner');
      setLobby((prev) => ({
        ...prev,
        nameJoiner: 'Empty...',
        isConnectedJoiner: false,
        isReadyJoiner: false,
        winsOwner: 0,
        winsJoiner: 0,
      }));
      setGlobal((prev) => ({
        ...prev,
        msgPopup: `${lobby.nameJoiner} has quit/disconnected.`,
      }));
      resetMessage();
    }

    // received by the joiner when the owner quit the lobby
    if (isStateAppLobby && event === 'quitOwner') {
      console.log('EVENT: quitOwner');
      setGlobal((prev) => ({
        ...prev,
        stateApp: 'preLobby',
        msgPopup: `${lobby.nameOwner} has quit/disconnected.`,
      }));
      setLobby({ ...valueDefaultProviderLobby });
      resetMessage();
      navigate('/');
    }

    // received when the server received a 'start' event
    // from another player which will happens only if the other player's
    // lobby showed that both players are ready.
    // The purpose is to double check readiness and also get the current
    // player's jet settings.
    if (isStateAppLobby && event === 'requestReady') {
      console.log('EVENT: requestReady');
      sendMessage({
        event: 'responseReady',
        isReady: isReadyOwner && isReadyJoiner,
        idLobby,
        settings,
        isOwnerLobby,
      });
      resetMessage();
    }

    // received when the server is starting the real-time game.
    if (isStateAppLobby && event === 'start') {
      console.log('EVENT: start');
      const { stateGame } = message;

      setGlobal((prev) => ({ ...prev, stateApp: 'countdown' }));
      resetMessage();
      navigate('/game', { state: stateGame });
    }
  }, [message]);
};

export { useLobbyWsEvents };
