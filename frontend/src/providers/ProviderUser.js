
import { createContext, useContext, useState } from 'react';

const ContextUser = createContext(null);
ContextUser.displayName = 'ContextUser';

const ProviderUser = (props) => {
  const user = useState(valueDefault);

  return <ContextUser.Provider value={user} {...props} />;
};

const useContextUser = () => {
  const user = useContext(ContextUser);
  if (user === null)
    throw new Error('useContextUser must be used within ProviderUser');

  return user;
};

const valueDefault = {
  isOwnerLobby: false,
  name: 'Anon',
};

// export { ProviderUser, useContextUser };
