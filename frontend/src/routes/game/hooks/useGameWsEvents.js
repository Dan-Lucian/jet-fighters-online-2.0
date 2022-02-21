/* eslint-disable no-use-before-define */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// shared hooks
import { useContextGlobal } from '../../../providers/ProviderGlobal';
import {
  useContextLobby,
  valueDefaultProviderLobby,
} from '../../../providers/ProviderLobby';
import { useContextWebsocket } from '../../../providers/ProviderWebsocket';

const useGameWsEvents = () => {
  const [global, setGlobal] = useContextGlobal();
  const [, setLobby] = useContextLobby();
  const { message, resetMessage } = useContextWebsocket();
  const navigate = useNavigate();

  const { stateApp } = global;
  const { event } = message;

  const isStateAppCountdown = stateApp === 'countdown';
  const isStateAppGame = stateApp === 'game';

  useEffect(() => {
    if (isStateAppGame && event === 'updateGame') {
      console.log('EVENT: updateGame');
      // stateGameCurrent.current = stateGameReceived;
    }

    // received by the owner when the joiner quit the lobby.
    if ((isStateAppGame || isStateAppCountdown) && event === 'quitJoiner') {
      console.log('EVENT: quitLobby');
      setGlobal((prev) => ({
        ...prev,
        stateApp: 'lobby',
        msgPopup: 'The lobby joiner has quit/disconnected.',
      }));
      setLobby((prev) => ({
        ...prev,
        nameJoiner: 'Empty...',
        isConnectedJoiner: false,
        isReadyJoiner: false,
      }));
      resetMessage();
      navigate('/lobby');
    }

    // received by the joiner when the owner quit the lobby
    if ((isStateAppGame || isStateAppCountdown) && event === 'quitOwner') {
      console.log('EVENT: quitOwner');
      setGlobal((prev) => ({
        ...prev,
        stateApp: 'preLobby',
        msgPopup: 'The lobby owner has quit/disconnected.',
      }));
      setLobby({ ...valueDefaultProviderLobby });
      resetMessage();
      navigate('/lobby');
    }
  }, [message]);
};

export { useGameWsEvents };
