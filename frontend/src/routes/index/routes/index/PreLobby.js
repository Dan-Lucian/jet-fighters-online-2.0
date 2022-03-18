// local hooks
import usePreLobbyWsEvents from './hooks/usePreLobbyWsEvents';

// local components
import StatusCreate from './components/StatusCreate';
import StatusJoin from './components/StatusJoin';
import BtnCreate from './components/BtnCreate';
import BtnJoin from './components/BtnJoin';
import StatusWs from './components/StatusWs';
import FormId from './components/FormId';

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
