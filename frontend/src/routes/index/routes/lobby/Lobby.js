import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// shared hooks
import { useContextWebsocket } from '../../../../providers/ProviderWebsocket';
import {
  useContextGame,
  valueDefaultProviderGame,
} from '../../../../providers/ProviderGame';
import { useContextSettings } from '../../../../providers/ProviderSettings';
import { useContextUser } from '../../../../providers/ProviderUser';

// local components
import WrapperLobby from './components/WrapperLobby';
import IdLobby from './components/IdLobby';
import TablePlayers from './components/TablePlayers';
import BtnReady from './components/BtnReady';
import BtnStart from './components/BtnStart';
import BtnQuit from './components/BtnQuit';

const Lobby = () => {
  const { message, sendMessage, resetMessage } = useContextWebsocket();
  const [game, setGame] = useContextGame();
  const [settings] = useContextSettings();
  const [user] = useContextUser();
  const navigate = useNavigate();

  const { event, success } = message;
  const { idLobby, statusGame, isReadyPlayer1, isReadyPlayer2 } = game;
  const { isOwnerLobby } = user;

  useEffect(() => {
    // this event is receveied by both players
    if (event === 'updateLobby' && statusGame === 'lobby') {
      console.log('EVENT: updateLobby');

      // this game object is relayed from the player who requested a change
      setGame(message.game);
      resetMessage();
    }

    // this event is receveied by the one who created the lobby
    // about someone joining the lobby
    if (success && event === 'join' && statusGame === 'lobby') {
      console.log('EVENT: join');
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
      resetMessage();
    }

    if (event === 'quitLobby' && statusGame === 'lobby') {
      console.log('EVENT: quitLobby');
      setGame((prev) => ({
        ...prev,
        namePlayer2: 'Empty...',
        statusConnectionPlayer2: 'notConnected',
        isReadyPlayer2: false,
      }));
      resetMessage();
    }

    if (event === 'destroyLobby' && statusGame === 'lobby') {
      console.log('EVENT: destroyLobby');
      setGame({ ...valueDefaultProviderGame });
      resetMessage();
      navigate('/');
    }

    // received when server received start event from another player which will
    // happen only if the other player's lobby shows that both players are ready
    // the purpose is to double check rediness and get the jet settings
    if (event === 'requestReady' && statusGame === 'lobby') {
      console.log('EVENT: requestReady');
      sendMessage({
        event: 'responseReady',
        isReady: isReadyPlayer1 && isReadyPlayer2,
        idLobby,
        settings,
        isOwnerLobby,
      });
      resetMessage();
    }

    // received when server starts the real-time game
    if (event === 'start' && statusGame === 'lobby') {
      console.log('EVENT: start');
      setGame((prev) => ({
        ...prev,
        statusGame: 'game',
      }));
      resetMessage();
      navigate('/game');
    }
  }, [message]);

  return (
    <WrapperLobby>
      <IdLobby idLobby={idLobby} />
      <TablePlayers />
      <BtnQuit />
      <BtnReady />
      <BtnStart />
    </WrapperLobby>
  );
};

export default Lobby;
