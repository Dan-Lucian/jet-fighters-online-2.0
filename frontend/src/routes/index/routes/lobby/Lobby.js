import { useEffect } from 'react';

// local components
import WrapperLobby from './components/WrapperLobby';
import IdLobby from './components/IdLobby';
import TablePlayers from './components/TablePlayers';
import StatusPlayer from './components/StatusPlayer';
import BtnReady from './components/BtnReady';
import BtnStart from './components/BtnStart';

// shared hooks
import { useContextGame } from '../../../../providers/ProviderGame';
import { useContextWebsocket } from '../../../../providers/ProviderWebsocket';

const Lobby = () => {
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
    isOwnerLobby,
    statusGame,
  } = game;

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

  const { message, sendMessage } = useContextWebsocket();
  const { event, success } = message;

  useEffect(() => {
    // if (event === 'updateLobby') {
    //   setGame(message.game);
    // }

    if (event === 'join' && success && statusGame === 'lobby') {
      setGame((prev) => ({
        ...prev,
        idLobby: message.idLobby,
        namePlayer1: message.nameOwner,
        namePlayer2: message.nameJoiner,
        statusConnectionPlayer2: 'connected',
      }));
    }
  }, [message]);

  const handleClickReady = () => {
    if (isOwnerLobby) {
      sendMessage({
        event: 'updateLobby',
        game: {
          ...game,
          isReadyPlayer1: !isReadyPlayer1,
        },
      });
      return;
    }

    sendMessage({
      event: 'updateLobby',
      game: {
        ...game,
        isReadyPlayer2: !isReadyPlayer2,
      },
    });
  };

  const handleClickStart = () => {
    console.log('Start game');
  };

  return (
    <WrapperLobby>
      <IdLobby idLobby={idLobby} />
      <TablePlayers {...propsTablePlayers} />
      <StatusPlayer />
      <BtnReady onClick={handleClickReady} />
      <BtnStart onClick={handleClickStart} />
    </WrapperLobby>
  );
};

export default Lobby;
