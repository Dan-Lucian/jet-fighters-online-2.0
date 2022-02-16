import { useEffect } from 'react';

// local components
import WrapperLobby from './components/WrapperLobby';
import IdLobby from './components/IdLobby';
import TablePlayers from './components/TablePlayers';
import StatusPlayer from './components/StatusPlayer';
import BtnReady from './components/BtnReady';
import BtnStart from './components/BtnStart';

// shared hooks
import { useContextWebsocket } from '../../../../providers/ProviderWebsocket';
import { useContextGame } from '../../../../providers/ProviderGame';

const Lobby = () => {
  const { message, sendMessage } = useContextWebsocket();
  const [game, setGame] = useContextGame();
  console.log('Game: ', game);

  const {
    idLobby,
    statusConnectionPlayer1,
    namePlayer1,
    scorePlayer1,
    isReadyPlayer1,
    statusConnectionPlayer2,
    namePlayer2,
    isReadyPlayer2,
    scorePlayer2,
    statusGame,
  } = game;
  const { event, success } = message;

  const propsTablePlayers = {
    statusConnectionPlayer1,
    namePlayer1,
    scorePlayer1,
    isReadyPlayer1,
    statusConnectionPlayer2,
    namePlayer2,
    isReadyPlayer2,
    scorePlayer2,
  };

  useEffect(() => {
    if (event === 'updateLobby') {
      setGame(message.game);
    }

    if (event === 'join' && success && statusGame === 'lobby') {
      setGame((prev) => {
        const gameNew = {
          ...prev,
          idLobby: message.idLobby,
          namePlayer1: message.nameOwner,
          namePlayer2: message.nameJoiner,
          statusConnectionPlayer2: 'connected',
        };

        sendMessage({
          event: 'updateLobby',
          game: gameNew,
        });

        return gameNew;
      });
    }
  }, [message]);

  return (
    <WrapperLobby>
      <IdLobby idLobby={idLobby} />
      <TablePlayers {...propsTablePlayers} />
      <StatusPlayer />
      <BtnReady />
      <BtnStart />
    </WrapperLobby>
  );
};

export default Lobby;
