/* eslint-disable no-use-before-define */
import { createContext, useContext, useState } from 'react';

const ContextJet = createContext(null);
ContextJet.displayName = 'ContextJet';

const ProviderJet = (props) => {
  const jet = useState(jetDefault);

  return <ContextJet.Provider value={jet} {...props} />;
};

const useJet = () => {
  const jet = useContext(ContextJet);
  if (jet === null) throw new Error('useJet must be used within ProvideJet');

  return jet;
};

const jetDefault = {
  type: 'balanced',
};

export { ProviderJet, useJet };
