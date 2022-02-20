// shared hooks
import { useContextGlobal } from '../../../../../providers/ProviderGlobal';
import { useContextSettings } from '../../../../../providers/ProviderSettings';
import { useContextWebsocket } from '../../../../../providers/ProviderWebsocket';

// styles
import styles from './FormId.module.scss';

const FormId = () => {
  const [global] = useContextGlobal();
  const [settings, setSettings] = useContextSettings();
  const { sendMessage } = useContextWebsocket();

  const { stateApp, name } = global;
  const { idJoin } = settings;

  const isstateAppPreLobby = stateApp === 'preLobby';

  const getHandlerSubmit = () => {
    if (isstateAppPreLobby)
      return (e) => {
        e.preventDefault();
        setSettings((prev) => ({ ...prev, idJoin: '' }));
        sendMessage({
          name,
          idLobby: idJoin,
          event: 'join',
        });
      };

    return (e) => {
      e.preventDefault();
      console.log(
        `join denial because needed stateApp: preLobby but currently stateApp: ${stateApp}`
      );
    };
  };

  const handleChange = (e) => {
    setSettings((prev) => ({ ...prev, idJoin: e.target.value }));
  };

  return (
    <form className={styles.form} onSubmit={getHandlerSubmit()} id="form-id">
      <input
        className={styles.input}
        type="text"
        placeholder="Insert room ID here"
        value={idJoin}
        onChange={handleChange}
        pattern="^r[A-Za-z0-9]{6}$"
        required
      />
    </form>
  );
};

export default FormId;
