// local hooks
import usePreLobbyWsEvents from './hooks/usePreLobbyWsEvents';

// local components
import StatusCreate from './components/StatusCreate/StatusCreate';
import StatusJoin from './components/StatusJoin/StatusJoin';
import BtnCreate from './components/BtnCreate/BtnCreate';
import BtnJoin from './components/BtnJoin/BtnJoin';
import StatusWs from './components/StatusWs/StatusWs';
import FormId from './components/FormId/FormId';

// styles
import styles from './PreLobby.module.scss';

const PreLobby = () => {
  usePreLobbyWsEvents();

  return (
    <div className={styles.wrapper}>
      <StatusCreate />
      <StatusJoin />
      <BtnCreate />
      <BtnJoin />
      <StatusWs />
      <FormId />
    </div>
  );
};

export default PreLobby;
