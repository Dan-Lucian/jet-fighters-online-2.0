import { createContext, useContext, useState } from 'react';

const ContextGlobal = createContext(null);
ContextGlobal.displayName = 'ContextGlobal';

const ProviderGlobal = (props) => {
  const dataGlobal = useState(valueDefault);

  return <ContextGlobal.Provider value={dataGlobal} {...props} />;
};

const useContextGlobal = () => {
  const dataGlobal = useContext(ContextGlobal);
  if (dataGlobal === null)
    throw new Error('useContextGlobal must be used within ProviderGlobal');

  return dataGlobal;
};

const valueDefault = {
  isOwnerLobby: false,
  name: 'Anon',
  stateApp: 'preLobby',
  msgPopup: null,
  pathBeforeLogin: null,
};
// stateApp has the following possible values
// preLobby, lobby, countdown, game, gameOver

export { ProviderGlobal, useContextGlobal };
