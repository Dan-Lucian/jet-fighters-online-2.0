// shared hooks
import { useContextGame } from '../../../../../providers/ProviderGame';
import { useContextUser } from '../../../../../providers/ProviderUser';
import { useContextSettings } from '../../../../../providers/ProviderSettings';
import { useContextWebsocket } from '../../../../../providers/ProviderWebsocket';

// styles
import styles from './FormId.module.scss';

const FormId = () => {
  const [game] = useContextGame();
  const [user] = useContextUser();
  const [settings, setSettings] = useContextSettings();
  const { sendMessage } = useContextWebsocket();

  const { stateGame } = game;
  const { name } = user;
  const { idJoin } = settings;

  const isstateGamePreLobby = stateGame === 'preLobby';

  const getHandlerSubmit = () => {
    if (isstateGamePreLobby)
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
        `join denial because needed stateGame: preLobby but currently stateGame: ${stateGame}`
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
