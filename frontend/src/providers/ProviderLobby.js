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
  isConnectedOwner: false,
  nameOwner: 'Empty...',
  winsOwner: 0,
  isReadyOwner: false,
  isConnectedJoiner: false,
  nameJoiner: 'Empty...',
  isReadyJoiner: false,
  winsJoiner: 0,
  idLobby: 'No lobby',
};

export { ProviderLobby, useContextLobby, valueDefaultProviderLobby };
