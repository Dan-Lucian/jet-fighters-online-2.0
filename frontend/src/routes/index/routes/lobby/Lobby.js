import { useEffect } from 'react';

// shared hooks
import { useContextWebsocket } from '../../../../providers/ProviderWebsocket';
import { useContextGame } from '../../../../providers/ProviderGame';

// local components
import WrapperLobby from './components/WrapperLobby';
import IdLobby from './components/IdLobby';
import TablePlayers from './components/TablePlayers';
import StatusPlayer from './components/StatusPlayer';
import BtnReady from './components/BtnReady';
import BtnStart from './components/BtnStart';

const Lobby = () => {
  const { message, sendMessage } = useContextWebsocket();
  const [game, setGame] = useContextGame();

  const { idLobby, statusGame } = game;
  const { event, success } = message;

  useEffect(() => {
    // this event is receveied by both players
    if (event === 'updateLobby') {
      // this game object is relayed from the player who requested a change
      setGame(message.game);
    }

    // this event is receveied by the one who created the lobby
    // about someone joining the lobby
    if (success && event === 'join' && statusGame === 'lobby') {
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
      <TablePlayers />
      <StatusPlayer />
      <BtnReady />
      <BtnStart />
    </WrapperLobby>
  );
};

export default Lobby;
