import { createContext, useContext } from 'react';

const ContextNotifications = createContext(null);
ContextNotifications.displayName = 'ContextNotifications';

const ProviderNotifications = (props) => (
  <ContextNotifications.Provider {...props} />
);

const useContextNotifications = () => {
  const data = useContext(ContextNotifications);
  if (data === null)
    throw new Error(
      'useContextNotifications must be used within ProviderNotifications'
    );

  return data;
};

export { ProviderNotifications, useContextNotifications };
