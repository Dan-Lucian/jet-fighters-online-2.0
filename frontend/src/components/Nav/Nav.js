import { Link } from 'react-router-dom';

// shared hooks
import { useContextGlobal } from '../../providers/ProviderGlobal';
import { useContextAuth } from '../../providers/ProviderAuth';

// shared components
import ThemeToggler from '../ThemeToggler/ThemeToggler';
import Search from '../Search/Search';
import Notifications from '../../modules/Notifications/Notifications';
import Guide from '../Guide/Guide';

// styles
import styles from './Nav.module.scss';

const Nav = () => {
  const [global] = useContextGlobal();
  const { account } = useContextAuth();

  const { stateApp } = global;

  const isStateAppLobby = stateApp === 'lobby';
  const isStateAppGame = stateApp === 'game' || stateApp === 'countdown' || stateApp === 'gameOver';

  return (
    <nav className={styles.nav}>
      <div className={styles.nav__left}>
        <Link to="/" className={styles.index}>
          Jet Fighters Online
        </Link>
        <Link to="/about" className={styles.about}>
          About
        </Link>
        {(isStateAppLobby || isStateAppGame) && (
          <Link to="/lobby" className={styles.about}>
            Lobby
          </Link>
        )}
        {isStateAppGame && (
          <Link to="/game" className={styles.about}>
            Game
          </Link>
        )}
      </div>
      <div className={styles.nav__right}>
        <Search />
        <Notifications />
        <Guide />
        {account && (
          <Link to={`/profile/${account.userName}`} className={styles.signin}>
            {account.userName}
          </Link>
        )}
        {!account && (
          <Link to="/login" className={styles.signin}>
            Login
          </Link>
        )}
        <ThemeToggler />
      </div>
    </nav>
  );
};

export default Nav;
