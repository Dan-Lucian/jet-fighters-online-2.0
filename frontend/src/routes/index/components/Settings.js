import styles from './Settings.module.scss';

const Settings = () => (
  <form className={styles.form}>
    <label htmlFor="max-score">Max score:</label>
    <span className={styles.tooltip} data-tooltip="Allowed 1-50">
      <input
        className={styles.input}
        pattern="[1-9]|[1-4][0-9]|50"
        type="text"
        id="max-score"
      />
    </span>
    <label htmlFor="map-width">Map width:</label>
    <span className={styles.tooltip} data-tooltip="Allowed 200-1000">
      <input
        className={styles.input}
        pattern="[2-9][0-9][0-9]|1000"
        type="text"
        id="map-width"
      />
    </span>
    <label htmlFor="map-height">Map height:</label>
    <span className={styles.tooltip} data-tooltip="Allowed 200-1000">
      <input
        className={styles.input}
        pattern="[2-9][0-9][0-9]|1000"
        type="text"
        id="map-height"
      />
    </span>
  </form>
);

export default Settings;
