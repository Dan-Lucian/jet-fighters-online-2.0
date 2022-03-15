// shared hooks
import { useContextWebsocket } from '../../../../../providers/ProviderWebsocket';
import { useContextGlobal } from '../../../../../providers/ProviderGlobal';
import { useContextAuth } from '../../../../../providers/ProviderAuth';

// styles
import styles from './BtnCreate.module.scss';

const BtnCreate = () => {
  const { sendMessage } = useContextWebsocket();
  const [global] = useContextGlobal();
  const { account } = useContextAuth();

  const { stateApp } = global;

  const isStateAppPreLobby = stateApp === 'preLobby';

  const getHandlerClick = () => {
    if (isStateAppPreLobby)
      return () => sendMessage({ name: account?.userName, event: 'create' });

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
