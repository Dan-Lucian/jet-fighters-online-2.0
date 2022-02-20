/* eslint-disable no-use-before-define */
import { createContext, useContext, useState } from 'react';

const ContextGame = createContext(null);
ContextGame.displayName = 'ContextGame';

const ProviderGame = (props) => {
  const game = useState(valueDefaultProviderGame);

  return <ContextGame.Provider value={game} {...props} />;
};

const useContextGame = () => {
  const game = useContext(ContextGame);
  if (game === null)
    throw new Error('useContextGame must be used within ProviderGame');

  return game;
};

const valueDefaultProviderGame = {
  stateGame: 'preLobby',
};

// export { ProviderGame, useContextGame };
