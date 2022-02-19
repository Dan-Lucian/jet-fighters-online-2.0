import { useEffect } from 'react';

// shared hooks
import { useContextGame } from '../../../../../providers/ProviderGame';
import { useContextUser } from '../../../../../providers/ProviderUser';
import { useContextLobby } from '../../../../../providers/ProviderLobby';
import { useContextWebsocket } from '../../../../../providers/ProviderWebsocket';

const useUnmountWsMessage = () => {
  const [game] = useContextGame();
  const [user] = useContextUser();
  const [, setLobby] = useContextLobby();
  const { sendMessage } = useContextWebsocket();

  const { statusGame } = game;
  const { isOwnerLobby } = user;

  useEffect(() => {
    if (isOwnerLobby && statusGame === 'lobby')
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

    if (statusGame === 'lobby')
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
  }, [isOwnerLobby, sendMessage, setLobby, statusGame]);
};

export { useUnmountWsMessage };
