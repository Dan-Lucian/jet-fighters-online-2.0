import { createContext, useContext, useState, useEffect, useLayoutEffect, useMemo } from 'react';
import { IProviderProps } from 'interfaces/generalInterfaces';
import { IAccount } from 'modules/Auth/interfaces/IAccount';
import { ILoginCredentials } from 'modules/Auth/interfaces/ILoginCredentials';
import { accountService } from 'services/GlobalServices';
import { isNull } from 'utils/generalTypeUtils';

interface IAuthContextProps {
  loading: boolean;
  account?: IAccount;
  error?: Error;
  login: (args: ILoginCredentials) => void;
  logout: () => void;
}

const AuthContext = createContext<IAuthContextProps | null>(null);
AuthContext.displayName = 'AuthContext';

export const AuthProvider = (props: IProviderProps<undefined>) => {
  const [account, setAccount] = useState<IAccount>();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);

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
    if (error) setError(undefined);
  }, [window.location.pathname]);

  const login = ({ email, password }: ILoginCredentials) => {
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
    setAccount(undefined);
    accountService.logout();
  };

  const memoValue = useMemo(
    () => ({
      account,
      loading,
      error,
      login,
      logout,
    }),
    [account, loading, error]
  );

  return <AuthContext.Provider {...props} value={memoValue} />;
};

export const useAuthContext = () => {
  const contextValue = useContext(AuthContext);

  if (isNull(contextValue)) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }

  return contextValue;
};
