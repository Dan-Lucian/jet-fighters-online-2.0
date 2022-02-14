/* eslint-disable no-use-before-define */
import { createContext, useContext, useState } from 'react';

const ContextSettings = createContext(null);
ContextSettings.displayName = 'ContextSettings';

const ProviderSettings = (props) => {
  const settings = useState(settingsDefault);

  return <ContextSettings.Provider value={settings} {...props} />;
};

const useSettings = () => {
  const settings = useContext(ContextSettings);
  if (settings === null)
    throw new Error('useSettings must be used within ProvideJet');

  return settings;
};

const settingsDefault = {
  typeJet: 'balanced',
  scoreMax: '',
  widthMap: '',
  heightMap: '',
};

export { ProviderSettings, useSettings };
