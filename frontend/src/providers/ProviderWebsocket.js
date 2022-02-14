/* eslint-disable no-use-before-define */
import { createContext, useContext } from 'react';

// shared hook
import { useWebsocket } from '../hooks/useWebsocket';

// config
import { config } from '../config/config';

const ContextWebsocket = createContext(null);
ContextWebsocket.displayName = 'ContextWebsocket';

const ProviderWebsocket = (props) => {
  const urlSocket = `ws://${config.hostname}${config.port}${config.routeWs}`;
  const websocket = useWebsocket(urlSocket);

  return <ContextWebsocket.Provider value={websocket} {...props} />;
};

const useContextWebsocket = () => {
  const websocket = useContext(ContextWebsocket);
  if (websocket === null)
    throw new Error(
      'useContextWebsocket must be used within ProviderWebsocket'
    );

  return websocket;
};

export { ProviderWebsocket, useContextWebsocket };
