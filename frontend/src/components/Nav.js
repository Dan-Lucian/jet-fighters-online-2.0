import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// shared hooks
import { useContextGlobal } from '../providers/ProviderGlobal';

// shared components
import TogglerTheme from './TogglerTheme';

// styles
import styles from './Nav.module.scss';

const Nav = ({ theme, getTogglerTheme }) => {
  const [global] = useContextGlobal();
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
      <Link to="/login" className={styles.signin}>
        Sign in
      </Link>
      <TogglerTheme theme={theme} getTogglerTheme={getTogglerTheme} />
    </nav>
  );
};
Nav.propTypes = {
  theme: PropTypes.string,
  getTogglerTheme: PropTypes.func,
};

export default Nav;
