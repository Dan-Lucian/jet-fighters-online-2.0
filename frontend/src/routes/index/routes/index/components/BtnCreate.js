// shared hooks
import { useContextWebsocket } from '../../../../../providers/ProviderWebsocket';
import { useContextGlobal } from '../../../../../providers/ProviderGlobal';

// styles
import styles from './BtnCreate.module.scss';

const BtnCreate = () => {
  const { sendMessage } = useContextWebsocket();
  const [global] = useContextGlobal();

  const { stateApp, name } = global;

  const isStateAppPreLobby = stateApp === 'preLobby';

  const getHandlerClick = () => {
    if (isStateAppPreLobby) return () => sendMessage({ name, event: 'create' });

    return () =>
      console.log(
        `create denial because needed stateApp: preLobby but currently stateApp: ${stateApp}`
      );
  };

  return (
    <button
      disabled={!isStateAppPreLobby}
      onClick={getHandlerClick()}
      className={styles.btnCreate}
      type="button"
    >
      Create a lobby
    </button>
  );
};

export default BtnCreate;
