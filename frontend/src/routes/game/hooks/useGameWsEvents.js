/* eslint-disable no-use-before-define */
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// shared hooks
import { useContextGlobal } from '../../../providers/ProviderGlobal';
import {
  useContextLobby,
  valueDefaultProviderLobby,
} from '../../../providers/ProviderLobby';
import { useContextWebsocket } from '../../../providers/ProviderWebsocket';

const useGameWsEvents = () => {
  const { state: stateGameInitial } = useLocation();
  const [global, setGlobal] = useContextGlobal();
  const [lobby, setLobby] = useContextLobby();
  const { message, resetMessage } = useContextWebsocket();
  const navigate = useNavigate();

  const { stateApp } = global;
  const { event } = message;
  const { stateGame } = message;

  const stateGameValid = stateGame || stateGameInitial || stateGameDefault;
  const isStateAppCountdown = stateApp === 'countdown';
  const isStateAppGame = stateApp === 'game';

  useEffect(() => {
    if (isStateAppGame && event === 'updateGame') {
      console.log('EVENT: updateGame');
      // stateGameCurrent.current = stateGameReceived;
    }

    // received by the owner when the joiner quit the lobby.
    if ((isStateAppGame || isStateAppCountdown) && event === 'quitJoiner') {
      console.log('EVENT: quitJoiner');
      setGlobal((prev) => ({
        ...prev,
        stateApp: 'lobby',
        msgPopup: `${lobby.nameJoiner} has quit/disconnected.`,
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
        msgPopup: `${lobby.nameOwner} has quit/disconnected.`,
      }));
      setLobby({ ...valueDefaultProviderLobby });
      resetMessage();
      navigate('/lobby');
    }

    if (isStateAppGame && event === 'gameOver') {
      console.log('EVENT: gameOver');

      const { winner } = message;
      console.log('Winner: ', winner);
      // stateGameCurrent.current = stateGameReceived;
    }
  }, [message]);

  return stateGameValid;
};

const stateGameDefault = {
  joiner: {
    name: '_____ ',
    score: 0,
  },
  owner: {
    name: '_____ ',
    score: 0,
  },
  settings: {
    scoreMax: '0',
    widthMap: 600,
    heightMap: 300,
  },
};

export { useGameWsEvents };
