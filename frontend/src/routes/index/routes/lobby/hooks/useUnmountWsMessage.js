import { useEffect } from 'react';

// shared hooks
import { useContextGlobal } from '../../../../../providers/ProviderGlobal';
import { useContextLobby } from '../../../../../providers/ProviderLobby';
import { useContextWebsocket } from '../../../../../providers/ProviderWebsocket';

/**
 * Notifies the server which in turn will notify the other player that
 * the current player has navigated away from the '/lobby'.
 * It will update isReadyPlayer and use the 'updateLobby' syncing method to
 * sync both player's lobby.
 */
const useUnmountWsMessage = () => {
  const [global] = useContextGlobal();
  const [, setLobby] = useContextLobby();
  const { sendMessage } = useContextWebsocket();

  const { stateApp, isOwnerLobby } = global;

  const isStateAppLobby = stateApp === 'lobby';

  useEffect(() => {
    if (isOwnerLobby && isStateAppLobby)
      return () => {
        setLobby((prev) => {
          const lobbyNew = {
            ...prev,
            isReadyPlayer1: false,
          };

          sendMessage({
            event: 'updateLobby',
            lobby: {
              ...lobbyNew,
            },
          });

          return lobbyNew;
        });
      };

    if (isStateAppLobby)
      return () => {
        setLobby((prev) => {
          const lobbyNew = {
            ...prev,
            isReadyPlayer2: false,
          };

          sendMessage({
            event: 'updateLobby',
            lobby: {
              ...lobbyNew,
            },
          });

          return lobbyNew;
        });
      };
  }, [isOwnerLobby, isStateAppLobby, sendMessage, setLobby, stateApp]);
};

export { useUnmountWsMessage };
