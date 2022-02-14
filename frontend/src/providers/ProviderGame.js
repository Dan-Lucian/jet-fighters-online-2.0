/* eslint-disable no-use-before-define */
import { createContext, useContext, useState } from 'react';

const ContextGame = createContext(null);
ContextGame.displayName = 'ContextGame';

const ProviderGame = (props) => {
  const players = useState(valueDefault);

  return <ContextGame.Provider value={players} {...props} />;
};

const useContextGame = () => {
  const players = useContext(ContextGame);
  if (players === null)
    throw new Error('useContextGame must be used within ProviderGame');

  return players;
};

const valueDefault = {
  statusConnectionPlayer1: 'connected',
  namePlayer1: 'Anon',
  scorePlayer1: 0,
  isReadyPlayer1: true,
  statusConnectionPlayer2: '',
  namePlayer2: 'Empty...',
  isReadyPlayer2: false,
  scorePlayer2: 0,
  idLobby: 'null',
  status: 'pre-lobby',
  isOwnerLobby: false,
};

export { ProviderGame, useContextGame };
