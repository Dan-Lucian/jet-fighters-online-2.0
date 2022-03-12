/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useContext, useState } from 'react';

// shared hooks
import { useAsync } from '../hooks/useAsync';

// services
import accountService from '../services/account.service';

const ContextAuth = createContext(null);
ContextAuth.displayName = 'ContextAuth';

const ProviderAuth = (props) => {
  const [account, setAccount] = useState(null);

  const login = ({ email, password }) => {
    accountService
      .login({ email, password })
      .then((response) => setAccount(response))
      .catch((error) => console.error('ERROR CAUGHT: ', error));
  };

  const logout = () => {
    setAccount(null);
    accountService.logout();
  };

  const value = { account, login, logout };

  return <ContextAuth.Provider value={value} {...props} />;
};

const useContextAuth = () => {
  const user = useContext(ContextAuth);
  if (user === null)
    throw new Error('useContextAuth must be used within ProviderAuth');

  return user;
};

export { ProviderAuth, useContextAuth };
