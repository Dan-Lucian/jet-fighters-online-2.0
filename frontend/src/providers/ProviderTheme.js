/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useContext, useLayoutEffect } from 'react';

// shared hooks
import { useLocalStorage } from '../hooks/useLocalStorage';

const ContextTheme = createContext(null);
ContextTheme.displayName = 'ContextTheme';

const ProviderTheme = (props) => {
  const [theme, setTheme] = useLocalStorage('theme', 'dark');

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-color-scheme', theme);
  });

  const getTogglerTheme = () => {
    switch (theme) {
      case 'dark':
        return () => setTheme('light');

      case 'light':
        return () => setTheme('dark');

      default:
        return () => console.log('no such theme');
    }
  };

  const value = {
    theme,
    setTheme,
    getTogglerTheme,
  };

  return <ContextTheme.Provider value={value} {...props} />;
};

const useContextTheme = () => {
  const theme = useContext(ContextTheme);
  if (theme === null)
    throw new Error('useContextTheme must be used within ProviderTheme');

  return theme;
};

export { ProviderTheme, useContextTheme };
