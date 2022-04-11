import { Link } from 'react-router-dom';

// shared hooks
import { useContextGlobal } from '../../providers/ProviderGlobal';
import { useContextAuth } from '../../providers/ProviderAuth';

// shared components
import TogglerTheme from '../TogglerTheme/TogglerTheme';

// styles
import styles from './Nav.module.scss';

const Nav = () => {
  const [global] = useContextGlobal();
  const { account } = useContextAuth();

  const { stateApp } = global;

  const isStateAppLobby = stateApp === 'lobby';
  const isStateAppGame =
    stateApp === 'game' || stateApp === 'countdown' || stateApp === 'gameOver';

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.index}>
        Jet Fighters Online
      </Link>
      <span className={styles.spacer} />
      {isStateAppGame && (
        <Link to="/game" className={styles.about}>
          Game
        </Link>
      )}
      {(isStateAppLobby || isStateAppGame) && (
        <Link to="/lobby" className={styles.about}>
          Lobby
        </Link>
      )}
      <Link to="/about" className={styles.about}>
        About
      </Link>
      {account ? (
        <Link to={`/profile/${account.userName}`} className={styles.signin}>
          {account.userName}
        </Link>
      ) : (
        <Link to="/login" className={styles.signin}>
          Login
        </Link>
      )}
      <TogglerTheme />
    </nav>
  );
};

export default Nav;
