import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import TogglerTheme from './TogglerTheme';

import styles from './Nav.module.scss';

const Nav = ({ theme, getTogglerTheme }) => (
  <nav className={styles.nav}>
    <Link to="/" className={styles.index}>
      Jet Fighters Online
    </Link>
    <span className={styles.spacer} />
    <Link to="/game" className={styles.about}>
      Game
    </Link>
    <Link to="/lobby" className={styles.about}>
      Lobby
    </Link>
    <Link to="/about" className={styles.about}>
      About
    </Link>
    <Link to="/login" className={styles.signin}>
      Sign in
    </Link>
    <TogglerTheme theme={theme} getTogglerTheme={getTogglerTheme} />
  </nav>
);
Nav.propTypes = {
  theme: PropTypes.string,
  getTogglerTheme: PropTypes.func,
};

export default Nav;
