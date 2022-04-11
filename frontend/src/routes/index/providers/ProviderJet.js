import { createContext, useContext, useState } from 'react';

const ContextJet = createContext(null);
ContextJet.displayName = 'ContextJet';

const jetDefault = {
  type: 'balanced',
};

const ProviderJet = (props) => {
  const jet = useState(jetDefault);

  return <ContextJet.Provider value={jet} {...props} />;
};

const useJet = () => {
  const jet = useContext(ContextJet);
  if (jet === null) throw new Error('useJet must be used within ProvideJet');

  return jet;
};

export { ProviderJet, useJet };
