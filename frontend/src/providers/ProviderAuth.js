/* eslint-disable react/jsx-no-constructed-context-values */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
  useMemo,
} from 'react';
import { useNavigate } from 'react-router-dom';

// services
import accountService from '../services/account.service';

const ContextAuth = createContext(null);
ContextAuth.displayName = 'ContextAuth';

const ProviderAuth = (props) => {
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  // If we change page, reset the error state.
  useEffect(() => {
    if (error) setError(null);
  }, [window.location.pathname]);

  useLayoutEffect(() => {
    setLoading(true);

    accountService
      .refreshToken()
      .then((response) => {
        setLoading(false);
        setAccount(response);
      })
      .catch((_error) => {
        console.error('ERROR CAUGHT: ', _error);
        setLoading(false);
      });
  }, []);

  const login = ({ email, password }) => {
    setLoading(true);

    accountService
      .login({ email, password })
      .then((response) => {
        setAccount(response);
        navigate('/profile');
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
