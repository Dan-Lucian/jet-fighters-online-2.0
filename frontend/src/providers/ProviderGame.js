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
  statusConnectionPlayer1: '',
  namePlayer1: 'Empty...',
  scorePlayer1: 0,
  isReadyPlayer1: false,
  statusConnectionPlayer2: '',
  namePlayer2: 'Empty...',
  isReadyPlayer2: false,
  scorePlayer2: 0,
  idLobby: null,
  statusGame: 'preLobby',
  statusJoin: null,
};

export { ProviderGame, useContextGame, valueDefaultProviderGame };
