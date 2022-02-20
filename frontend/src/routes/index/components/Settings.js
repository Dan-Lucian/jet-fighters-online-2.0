// shared hooks
import { useContextGame } from '../../../providers/ProviderGame';
import { useContextUser } from '../../../providers/ProviderUser';
import { useContextSettings } from '../../../providers/ProviderSettings';
import { useContextLobby } from '../../../providers/ProviderLobby';
import { useContextWebsocket } from '../../../providers/ProviderWebsocket';

// styles
import styles from './Settings.module.scss';

const Settings = () => {
  const [game] = useContextGame();
  const [user] = useContextUser();
  const [settings, setSettings] = useContextSettings();
  const [lobby] = useContextLobby();
  const { sendMessage } = useContextWebsocket();

  const { stateGame } = game;
  const { isOwnerLobby } = user;
  const { scoreMax, widthMap, heightMap } = settings;
  const { idLobby, isReadyPlayer1, isReadyPlayer2 } = lobby;

  const isStateGameLobby = stateGame === 'lobby';
  const arePlayersReady = isReadyPlayer1 && isReadyPlayer2;

  const getHandlerInput = (prop) => (e) => {
    const valueInput = {};
    valueInput[prop] = e.target.value;
    setSettings((prev) => ({ ...prev, ...valueInput }));
  };

  const getHandlerSubmit = () => {
    // the sform will work only if both players are shown to be ready
    if (isStateGameLobby && arePlayersReady) {
      return (e) => {
        e.preventDefault();
        sendMessage({ event: 'start', isOwnerLobby, idLobby, settings });
      };
    }

    if (isStateGameLobby && (!isReadyPlayer1 || !isReadyPlayer2)) {
      return (e) => {
        e.preventDefault();
        console.log(`start denial because one of the players is not ready`);
      };
    }

    return (e) => {
      e.preventDefault();
      console.log(
        `start denial because needed stateGame=lobby but currently stateGame=${stateGame}`
      );
    };
  };

  return (
    <form
      onSubmit={getHandlerSubmit()}
      className={styles.form}
      id="form-settings-game"
    >
      <label htmlFor="max-score">Max score:</label>
      <span className={styles.tooltip} data-tooltip="Allowed 1-50">
        <input
          className={styles.input}
          pattern="[1-9]|[1-4][0-9]|50"
          type="text"
          id="max-score"
          value={scoreMax}
          onChange={getHandlerInput('scoreMax')}
          required
        />
      </span>
      <label htmlFor="width-map">Map width:</label>
      <span className={styles.tooltip} data-tooltip="Allowed 200-1000">
        <input
          className={styles.input}
          pattern="[2-9][0-9][0-9]|1000"
          type="text"
          id="width-map"
          value={widthMap}
          onChange={getHandlerInput('widthMap')}
          required
        />
      </span>
      <label htmlFor="height-map">Map height:</label>
      <span className={styles.tooltip} data-tooltip="Allowed 200-1000">
        <input
          className={styles.input}
          pattern="[2-9][0-9][0-9]|1000"
          type="text"
          id="height-map"
          value={heightMap}
          onChange={getHandlerInput('heightMap')}
          required
        />
      </span>
    </form>
  );
};

export default Settings;
