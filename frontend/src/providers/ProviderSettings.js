import { createContext, useContext } from 'react';

// config
import { jetTypesConfig } from '../config/jetTypesConfig';

// shared hooks
import useLocalStorage from '../hooks/useLocalStorage';

const ContextSettings = createContext(null);
ContextSettings.displayName = 'ContextSettings';

const ProviderSettings = (props) => {
  const settings = useLocalStorage('settingsJetGame', settingsDefault);

  return <ContextSettings.Provider value={settings} {...props} />;
};

const useContextSettings = () => {
  const settings = useContext(ContextSettings);
  if (settings === null) throw new Error('useContextSettings must be used within ProviderSettings');

  return settings;
};

const settingsDefault = {
  scoreMax: '10',
  widthMap: '600',
  heightMap: '400',
  idJoin: '',
  ...Object.values(jetTypesConfig)[0],
};

export { ProviderSettings, useContextSettings };
