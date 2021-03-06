/* eslint-disable react/jsx-no-constructed-context-values */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
  useMemo,
} from 'react';

// services
import accountService from '../services/account.service';

const ContextAuth = createContext(null);
ContextAuth.displayName = 'ContextAuth';

const ProviderAuth = (props) => {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  useLayoutEffect(() => {
    setLoading(true);

    accountService
      .refreshToken()
      .then((response) => {
        // order is important since it doesn't batch
        setAccount(response);
        setLoading(false);
      })
      .catch((_error) => {
        console.error('ERROR CAUGHT: ', _error);
        setLoading(false);
      });
  }, []);

  // If we change page, reset the error state.
  useEffect(() => {
    if (error) setError(null);
  }, [window.location.pathname]);

  const login = ({ email, password }) => {
    setLoading(true);

    accountService
      .login({ email, password })
      .then((response) => {
        setAccount(response);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  };

  const logout = () => {
    setAccount(null);
    accountService.logout();
  };

  const valueMemoed = useMemo(
    () => ({
      account,
      loading,
      error,
      login,
      logout,
    }),
    [account, loading, error]
  );

  return <ContextAuth.Provider value={valueMemoed} {...props} />;
};

const useContextAuth = () => {
  const auth = useContext(ContextAuth);
  if (auth === null)
    throw new Error('useContextAuth must be used within ProviderAuth');

  return auth;
};

export { ProviderAuth, useContextAuth };
