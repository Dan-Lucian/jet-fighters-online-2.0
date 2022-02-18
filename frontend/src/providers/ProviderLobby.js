/* eslint-disable no-use-before-define */
import { createContext, useContext, useState } from 'react';

const ContextLobby = createContext(null);
ContextLobby.displayName = 'ContextLobby';

const ProviderLobby = (props) => {
  const lobby = useState(valueDefaultProviderLobby);

  return <ContextLobby.Provider value={lobby} {...props} />;
};

const useContextLobby = () => {
  const lobby = useContext(ContextLobby);
  if (lobby === null)
    throw new Error('useContextLobby must be used within ProviderLobby');

  return lobby;
};

const valueDefaultProviderLobby = {
  statusConnectionPlayer1: '',
  namePlayer1: 'Empty...',
  scorePlayer1: 0,
  isReadyPlayer1: false,
  statusConnectionPlayer2: '',
  namePlayer2: 'Empty...',
  isReadyPlayer2: false,
  scorePlayer2: 0,
  idLobby: null,
  statusGame: 'preLobby',
  statusJoin: null,
};

export { ProviderLobby, useContextLobby, valueDefaultProviderLobby };
