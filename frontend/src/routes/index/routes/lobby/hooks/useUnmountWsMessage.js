import { useEffect } from 'react';

// shared hooks
import { useContextWebsocket } from '../../../../../providers/ProviderWebsocket';
import { useContextLobby } from '../../../../../providers/ProviderLobby';
import { useContextUser } from '../../../../../providers/ProviderUser';

const useUnmountWsMessage = () => {
  const { sendMessage } = useContextWebsocket();
  const [lobby, setLobby] = useContextLobby();
  const [user] = useContextUser();

  const { statusGame } = lobby;
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
