/* eslint-disable no-use-before-define */
import { createContext, useContext, useState } from 'react';

const ContextGlobal = createContext(null);
ContextGlobal.displayName = 'ContextGlobal';

const ProviderGlobal = (props) => {
  const user = useState(valueDefault);

  return <ContextGlobal.Provider value={user} {...props} />;
};

const useContextGlobal = () => {
  const user = useContext(ContextGlobal);
  if (user === null)
    throw new Error('useContextGlobal must be used within ProviderGlobal');

  return user;
};

const valueDefault = {
  isOwnerLobby: false,
  name: 'Anon',
  stateApp: 'preLobby',
  msgPopup: null,
};

export { ProviderGlobal, useContextGlobal };
