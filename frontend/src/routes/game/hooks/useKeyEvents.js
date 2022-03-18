import { useCallback } from 'react';

// shared hooks
import { useContextGlobal } from '../../../providers/ProviderGlobal';
import { useContextWebsocket } from '../../../providers/ProviderWebsocket';
import useEventListener from '../../../hooks/useEventListener';

const useKeyEvents = () => {
  const [global] = useContextGlobal();
  const { sendMessage } = useContextWebsocket();

  const { stateApp, isOwnerLobby } = global;

  const isStateAppGame = stateApp === 'game';

  const handleKeyDown = useCallback(
    (e) => {
      if (isStateAppGame) {
        e.preventDefault();
        if (e.repeat) return;

        const response = {
          event: 'input',
          isOwnerLobby,
        };

        switch (e.key) {
          case 'ArrowRight':
            sendMessage({ ...response, isPressedRight: true });
            return;

          case 'ArrowLeft':
            sendMessage({ ...response, isPressedLeft: true });
            return;

          case ' ':
            sendMessage({ ...response, isPressedFire: true });
            break;

          default:
        }
      }
    },
    [isOwnerLobby, isStateAppGame, sendMessage]
  );

  const handleKeyUp = useCallback(
    (e) => {
      if (isStateAppGame) {
        e.preventDefault();
        if (e.repeat) return;

        const response = {
          event: 'input',
          isOwnerLobby,
        };

        switch (e.key) {
          case 'ArrowRight':
            sendMessage({ ...response, isReleasedRight: true });
            return;

          case 'ArrowLeft':
            sendMessage({ ...response, isReleasedLeft: true });
            break;

          default:
        }
      }
    },
    [isOwnerLobby, isStateAppGame, sendMessage]
  );

  useEventListener('keydown', handleKeyDown);
  useEventListener('keyup', handleKeyUp);
};

export default useKeyEvents;
