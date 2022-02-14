// shared components
import { useContextSettings } from '../../../providers/ProviderSettings';

// styles
import styles from './Settings.module.scss';

const Settings = () => {
  const [settings, setSettings] = useContextSettings();
  const { scoreMax, widthMap, heightMap } = settings;

  const getHandlerInput = (prop) => (e) => {
    const valueInput = {};
    valueInput[prop] = e.target.value;
    setSettings((prev) => ({ ...prev, ...valueInput }));
  };

  return (
    <form className={styles.form}>
      <label htmlFor="max-score">Max score:</label>
      <span className={styles.tooltip} data-tooltip="Allowed 1-50">
        <input
          className={styles.input}
          pattern="[1-9]|[1-4][0-9]|50"
          type="text"
          id="max-score"
          value={scoreMax}
          onChange={getHandlerInput('scoreMax')}
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
        />
      </span>
    </form>
  );
};

export default Settings;
