import { useEffect } from 'react';

// shared hooks
import { useContextGame } from '../../../../../providers/ProviderGame';
import { useContextUser } from '../../../../../providers/ProviderUser';
import { useContextLobby } from '../../../../../providers/ProviderLobby';
import { useContextWebsocket } from '../../../../../providers/ProviderWebsocket';

/**
 * Notifies the server which in turn will notify the other player that
 * the current player has navigated away from the '/lobby'.
 * It will update isReadyPlayer and use the 'updateLobby' syncing method to
 * sync both player's lobby.
 */
const useUnmountWsMessage = () => {
  const [game] = useContextGame();
  const [user] = useContextUser();
  const [, setLobby] = useContextLobby();
  const { sendMessage } = useContextWebsocket();

  const { stateGame } = game;
  const { isOwnerLobby } = user;

  const isStateGameLobby = stateGame === 'lobby';

  useEffect(() => {
    if (isOwnerLobby && isStateGameLobby)
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

    if (isStateGameLobby)
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
  }, [isOwnerLobby, isStateGameLobby, sendMessage, setLobby, stateGame]);
};

export { useUnmountWsMessage };
