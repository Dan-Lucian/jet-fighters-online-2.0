/* eslint-disable no-use-before-define */
import { createContext, useContext, useState } from 'react';

const ContextSettings = createContext(null);
ContextSettings.displayName = 'ContextSettings';

const ProviderSettings = (props) => {
  const settings = useState(settingsDefault);

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
  scoreMax: '',
  widthMap: '',
  heightMap: '',
  idJoin: '',
};

export { ProviderSettings, useContextSettings };
