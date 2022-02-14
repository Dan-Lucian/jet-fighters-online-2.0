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
  const [
    {
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
    },
    setGame,
  ] = useContextGame();

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

  useEffect(() => {
    if (message.event === 'changeReady') {
      if (message.isOwnerLobby) {
        setGame((prev) => ({ ...prev, isReadyPlayer1: !prev.isReadyPlayer1 }));
        return;
      }
      setGame((prev) => ({ ...prev, isReadyPlayer2: !prev.isReadyPlayer2 }));
    }
  }, [message]);

  const handleClickReady = () => {
    sendMessage({ event: 'changeReady', isOwnerLobby });
  };

  const handleClickStart = () => {
    sendMessage({ event: 'start', isOwnerLobby });
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
