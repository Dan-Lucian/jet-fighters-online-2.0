/* eslint-disable no-use-before-define */
import { createContext, useContext } from 'react';

// shared hooks
import { useLocalStorage } from '../hooks/useLocalStorage';

const ContextSettings = createContext(null);
ContextSettings.displayName = 'ContextSettings';

const ProviderSettings = (props) => {
  const settings = useLocalStorage('settingsJetGame', settingsDefault);

  return <ContextSettings.Provider value={settings} {...props} />;
};

const useContextSettings = () => {
  const settings = useContext(ContextSettings);
  if (settings === null)
    throw new Error('useContextSettings must be used within ProviderSettings');

  return settings;
};

const settingsDefault = {
  typeJet: 'balanced',
  scoreMax: '5',
  widthMap: '600',
  heightMap: '300',
  idJoin: '',
};

export { ProviderSettings, useContextSettings };
