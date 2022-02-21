// shared hooks
import { useContextGlobal } from '../../../providers/ProviderGlobal';
import { useContextSettings } from '../../../providers/ProviderSettings';
import { useContextLobby } from '../../../providers/ProviderLobby';
import { useContextWebsocket } from '../../../providers/ProviderWebsocket';

// styles
import styles from './Settings.module.scss';

const Settings = () => {
  const [global] = useContextGlobal();
  const [settings, setSettings] = useContextSettings();
  const [lobby] = useContextLobby();
  const { sendMessage } = useContextWebsocket();

  const { stateApp, isOwnerLobby } = global;
  const { scoreMax, widthMap, heightMap } = settings;
  const { idLobby, isReadyOwner, isReadyJoiner } = lobby;

  const isStateAppLobby = stateApp === 'lobby';
  const arePlayersReady = isReadyOwner && isReadyJoiner;

  const getHandlerInput = (prop) => (e) => {
    const valueInput = {};
    valueInput[prop] = e.target.value;
    setSettings((prev) => ({ ...prev, ...valueInput }));
  };

  const getHandlerSubmit = () => {
    // the sform will work only if both players are shown to be ready
    if (isStateAppLobby && arePlayersReady) {
      return (e) => {
        e.preventDefault();
        sendMessage({ event: 'start', isOwnerLobby, idLobby, settings });
      };
    }

    if (isStateAppLobby && (!isReadyOwner || !isReadyJoiner)) {
      return (e) => {
        e.preventDefault();
        console.log(`start denial because one of the players is not ready`);
      };
    }

    return (e) => {
      e.preventDefault();
      console.log(
        `start denial because needed stateApp=lobby but currently stateApp=${stateApp}`
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
          pattern="^[1-9]|[1-4][0-9]|50$"
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
          pattern="^[2-9][0-9][0-9]|1000$"
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
          pattern="^[2-9][0-9][0-9]|1000$"
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
