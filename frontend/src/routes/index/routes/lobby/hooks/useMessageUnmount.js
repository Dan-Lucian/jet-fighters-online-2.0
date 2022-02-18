import { useEffect } from 'react';

// shared hooks
import { useContextWebsocket } from '../../../../../providers/ProviderWebsocket';
import { useContextGame } from '../../../../../providers/ProviderGame';
import { useContextUser } from '../../../../../providers/ProviderUser';

const useUnmountWsMessage = () => {
  const { sendMessage } = useContextWebsocket();
  const [game, setGame] = useContextGame();
  const [user] = useContextUser();

  const { statusGame } = game;
  const { isOwnerLobby } = user;

  useEffect(() => {
    if (isOwnerLobby && statusGame === 'lobby')
      return () => {
        setGame((prev) => {
          const gameNew = {
            ...prev,
            isReadyPlayer1: false,
          };
          sendMessage({
            event: 'updateLobby',
            game: {
              ...gameNew,
            },
          });
          return gameNew;
        });
      };

    if (statusGame === 'lobby')
      return () => {
        setGame((prev) => {
          const gameNew = {
            ...prev,
            isReadyPlayer2: false,
          };
          sendMessage({
            event: 'updateLobby',
            game: {
              ...gameNew,
            },
          });
          return gameNew;
        });
      };
  }, [isOwnerLobby, sendMessage, setGame, statusGame]);
};
export { useUnmountWsMessage };
