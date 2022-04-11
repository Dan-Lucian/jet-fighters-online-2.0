// shared hooks
import { useContextAuth } from '../../../../../../providers/ProviderAuth';
import { useContextGlobal } from '../../../../../../providers/ProviderGlobal';
import { useContextSettings } from '../../../../../../providers/ProviderSettings';
import { useContextWebsocket } from '../../../../../../providers/ProviderWebsocket';

// styles
import styles from './FormId.module.scss';

const FormId = () => {
  const [{ stateApp }] = useContextGlobal();
  const [{ idJoin }, setSettings] = useContextSettings();
  const { sendMessage } = useContextWebsocket();
  const { account } = useContextAuth();

  const isstateAppPreLobby = stateApp === 'preLobby';

  const getHandlerSubmit = () => {
    if (isstateAppPreLobby)
      return (event) => {
        event.preventDefault();
        setSettings((prev) => ({ ...prev, idJoin: '' }));
        sendMessage({
          name: account?.userName || 'Anon',
          idLobby: idJoin,
          event: 'join',
        });
      };

    return (event) => {
      event.preventDefault();
      console.log(
        `join denial because needed stateApp=preLobby but stateApp=${stateApp}`
      );
    };
  };

  const handleChange = (event) => {
    setSettings((prev) => ({ ...prev, idJoin: event.target.value }));
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
