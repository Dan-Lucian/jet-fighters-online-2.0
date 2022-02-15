/* eslint-disable no-use-before-define */
import { createContext, useContext, useState } from 'react';

const ContextGame = createContext(null);
ContextGame.displayName = 'ContextGame';

const ProviderGame = (props) => {
  const game = useState(valueDefault);

  return <ContextGame.Provider value={game} {...props} />;
};

const useContextGame = () => {
  const game = useContext(ContextGame);
  if (game === null)
    throw new Error('useContextGame must be used within ProviderGame');

  return game;
};

const valueDefault = {
  statusConnectionPlayer1: '',
  namePlayer1: 'Anon',
  scorePlayer1: 0,
  isReadyPlayer1: false,
  statusConnectionPlayer2: '',
  namePlayer2: 'Empty...',
  isReadyPlayer2: false,
  scorePlayer2: 0,
  idLobby: 'null',
  statusGame: 'preLobby',
  isOwnerLobby: false,
  statusJoin: null,
  namePlayerCurrent: 'Anon',
};

export { ProviderGame, useContextGame };
